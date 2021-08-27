const axios = require('axios')
const FormData = require('form-data')

const fs = require('fs')

const constants = {
  MAX_CONTENT_LENGTH: 100 * 1024 * 1024,
  UPLOAD_URL: {
    dev: 'http://10.172.58.205:1031/oss/upload',
    test: 'http://10.172.58.182:1031/oss/upload',
    autotest: 'http://10.172.58.206:1031/oss/upload',
    pre: 'http://10.218.82.222:1031/oss/upload',
    prod: 'http://ratelimit-service-internal.duiba.com.cn/oss/upload'
  }
}

const { UPLOAD_URL, MAX_CONTENT_LENGTH } = constants

const { NODE_ENV } = process.env

class OSS {
  constructor(options) {
    this.options = {
      ...this.options,
      ...options
    }
    return this
  }

  options = {
    bucket: 'duiba',
    needCheck: true
  }

  url = UPLOAD_URL[(NODE_ENV || 'dev')] || UPLOAD_URL.dev

  async put({ path, file, base64 }) {
    const { bucket, needCheck } = this.options
    const form = new FormData({
      maxDataSize: MAX_CONTENT_LENGTH
    })
    form.append('bucketName', bucket)
    form.append('needCheck', needCheck ? 'true' : 'false')
    if (path) {
      form.append('path', path.replace(/^\//, ''))
    }
    if (file) {
      if (typeof file === 'string') {
        form.append('file', fs.createReadStream(file))
      } else {
        form.append('file', file)
      }
    } else if (base64) {
      form.append('base64', base64)
    }
    return new Promise((resolve, reject) => {
      axios
        .post(this.url, form, {
          headers: form.getHeaders(),
          maxContentLength: MAX_CONTENT_LENGTH
        })
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          if (err.response) {
            resolve(err.response.data)
          } else {
            reject(err)
          }
        })
    })
  }
}

module.exports = OSS
