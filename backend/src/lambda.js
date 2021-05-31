const serverlessExpress = require('serverless-express')
const app = require('./app')

exports.handler = serverlessExpress({ app })
