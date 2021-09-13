const express = require('express')
const axios = require('axios')
const fs = require('fs')
const router = express.Router()
// const testData = require('./test.json')
// const eurekaTestData = require('./eurekaTest.json')
const reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\:([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/

router.post('/instances', async (req, res, next) => {
  try {
    const {url} = req.body
    const apiDocsRes = await axios.get(url)
    res.json({code: 200, message: '请求成功', data: apiDocsRes.data})
    // res.json({code: 200, message: '请求成功', data: eurekaTestData})
  } catch (e) {
    res.json({code: 500, message: e.toString(), data: {}})
  }
})
router.post('/apiDocs', async (req, res, next) => {
  try {
    const {url} = req.body
    const apiDocsRes = await axios.get(url)
    res.json({code: 200, message: '请求成功', data: apiDocsRes.data})
    // res.json({code: 200, message: '请求成功', data: testData})
  } catch (e) {
    res.json({code: 500, message: e.toString(), data: {}})
  }
})

module.exports = router