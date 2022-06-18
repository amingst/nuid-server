const express = require('express')
const nuidApi = require('@nuid/sdk-nodejs').default({
	auth: { apiKey: process.env.NUID_KEY },
})

require('dotenv').config()
const router = require('./router.js')
const port = process.env.PORT || 4000
const app = express()

app.use(express.json({ extended: true, urlencoded: true }))
//app.use(cors)
app.use('/v1', router)

globalThis.nuidApi = nuidApi

app.listen(port, () => console.log(`server running on port: ${port}`))
