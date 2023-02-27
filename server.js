/* eslint-disable n/no-path-concat */
const express = require('express')
const favicon = require('express-favicon')
const proxy = require('express-http-proxy')
const path = require('path')
const axios = require('axios')
const requestIp = require('request-ip')

const BACKEND_HOST = process.env.BACKEND_HOST || 'localhost:3001'
const PORT = process.env.PORT || 3000
const POST_PAGE_TMPL = /^\/post\/(\d+)$/

const app = express()

app.set('trust proxy', true)

// monitoring
app.use(require('express-status-monitor')({ path: '/supersecretmonitoring' }))

const logRequestIfNeeded = (req) => {
  const postMatch = req.url.match(POST_PAGE_TMPL)

  if (postMatch !== null && typeof postMatch[1] === 'string') {
    const params = {
      postId: postMatch[1],
      userAgent: req.get('User-Agent'),
      userIp: requestIp.getClientIp(req) || undefined,
      byFrontend: true
    }
    axios.post(`http://${BACKEND_HOST}/api/info`, params)
      .catch(e => { console.log(e) }) // TODO send to sentry

    // console.log(req.socket && req.socket.remoteAddress)
    // console.log(req.headers && req.headers['x-forwarded-for'])
    // console.log(req.ip)
    // console.log('---')
  }
}

// redurect for imgs
app.get('/imgs/*', (req, res, next) => {
  const requestedUrl = `${BACKEND_HOST}${req.url}`
  proxy(requestedUrl)(req, res, next)
})

// favicon
app.use(favicon(`${__dirname}/build/favicon.ico`))

// static files
app.use(express.static(path.join(__dirname, 'build'), { index: false }))

// index.html and others paths
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
  setTimeout(() => logRequestIfNeeded(req), 10)
})

app.listen(PORT)
