const axios = require('axios')
const FormData = require('form-data')

const fs = require('fs')

const { UPLOAD_URL, MAX_CONTENT_LENGTH } = require('./constants')

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
