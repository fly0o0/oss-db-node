const path = require('path')

const OSS = require('../src/index')

const oss = new OSS()

;(async () => {
  const res = await oss.put({
    path: `/oss-node/test.${Date.now()}.txt`,
    file: path.resolve(__dirname, './test.txt')
  })
  console.log(res)
})()
