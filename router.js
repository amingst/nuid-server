const express = require('express')
require('dotenv').config()

const nuidApi = require('@nuid/sdk-nodejs').default({
	auth: { apiKey: process.env.NUID_KEY },
})

const web3store = require('./web3storage')

const router = express.Router()

router.post('/register', async (req, res) => {
	try {
		const email = req.body.email
		const createRes = await nuidApi.auth.credentialCreate(req.body.credential)

		const user = {
			email,
			nuid: createRes.parsedBody['nu/id'],
		}

		const usr = web3store.makeFileObjects(user, 'user.json')
		const cid = await web3store.storeWithProgress([usr])

		let resp = {
			email: user.email,
			cid,
		}

		res.send(resp)
		return
	} catch (res) {
		console.log(res)
		return
	}
})

router.post('/challenge', async (req, res) => {})

router.post('/login', async (req, res) => {})

router.post('/forgot', async (req, res) => {})

router.post('/change', async (req, res) => {})

module.exports = router
