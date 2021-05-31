const express = require('express')
const { Pool } = require('pg')
const cors = require('cors')
const { getCurrentInvoke } = require('serverless-express')
const app = express()
const router = express.Router()

require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
})

router.use(cors())

router.get('/', (req, res) => {
  const currentInvoke = getCurrentInvoke()
  const { event = {} } = currentInvoke
  const {
    requestContext = {}
  } = event
  const {
    domainName = 'localhost:5000'
  } = requestContext
  const apiUrl = `https://${domainName}`
  res.render('index', {
    apiUrl
  })
})

router.get('/test', (req, res) => {
  res.json({"test": true})
})

router.get('/dbCon', (req, res) => {
  pool
    .connect()
    .then(() => res.json({"result": "Database connected"}))
    .catch(err => console.log(err))
})

// The serverless-express library creates a server and listens on a Unix
// Domain Socket for you, so you can remove the usual call to app.listen.
// app.listen(5000)
app.use('/', router)

// Export your express server so you can import it in the lambda function.
module.exports = app
