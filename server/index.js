const http = require('http')
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json())
const api = require('./api')
// api服务
app.use('/api', api)
// web服务
const staticPath = path.join(__dirname, '../dist')
app.use('/', express.static(staticPath))
app.use((req, res, next) => {
  //设置请求头
  res.set({
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Max-Age': 1728000,
    'Access-Control-Allow-Origin': req.headers.origin || '*',
    'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
    'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  })
  req.method === 'OPTIONS' ? res.status(204).end() : next()
})
app.use("/*", function (req, res) {
  res.setHeader('content-type', 'text/html;charset=utf-8')
  res.sendfile(staticPath + "/index.html")
})
const port = process.env.PORT || 3001
http.createServer(app).listen(port)
console.log(`服务启动, http://localhost:${port}`)