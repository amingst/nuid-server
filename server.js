const express = require('express')
const axios = require('axios')
const nuidApi = require('@nuid/sdk-nodejs').default({
	auth: { apiKey: process.env.NUID_KEY },
})

require('dotenv').config()
const port = process.env.PORT || 4000
const app = express()

app.listen(port, () => console.log(`server running on port: ${port}`))
