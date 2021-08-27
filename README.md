# OSS-NODE

阿里云 OSS 上传工具 Node 版本

## 安装

```bash
yarn add oss-node
```

```bash
npm install oss-node
```

## 使用

```ts
const path = require('path')

// TS
import OSS from 'oss-node'

// JS
const OSS = require('oss-node').default

const oss = new OSS()

;(async () => {
  const res = await oss.put({
    path: '/1.txt',
    file: path.resolve(__dirname, './1.txt')
  })
  console.log(res)
})()
```

## 参数

### bucket

Type: `string` Default: `duiba`

oss 实例名

## API

### .put({ path, file, base64 })

上传文件

#### path

Type: `string` Default: `-`

远程文件路径，不传则为随机名

#### file

Type: `string` | `ReadStream` Default: `-`

本地文件路径

#### base64

Type: `string` Default: `-`

Base64 类型文件
