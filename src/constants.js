module.exports = {
  MAX_CONTENT_LENGTH: 100 * 1024 * 1024,
  UPLOAD_URL: {
    dev: 'http://10.172.58.205:1031/oss/upload',
    test: 'http://10.172.58.182:1031/oss/upload',
    autotest: 'http://10.172.58.206:1031/oss/upload',
    pre: 'http://10.218.82.222:1031/oss/upload',
    prod: 'http://ratelimit-service-internal.duiba.com.cn/oss/upload'
  }
}
