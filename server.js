const express = require('express')
const axios = require('axios')
const nuidApi = require('@nuid/sdk-nodejs').default({
	auth: { apiKey: process.env.NUID_KEY },
})

require('dotenv').config()
const router = require('./router.js')
const port = process.env.PORT || 4000
const app = express()

app.use('/v1', router)

globalThis.nuid = nuidApi

app.listen(port, () => console.log(`server running on port: ${port}`))
