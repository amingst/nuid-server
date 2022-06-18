const Web3Storage = require('web3.storage')
require('dotenv').config()

function makeStorageClient() {
	return new Web3Storage.Web3Storage({ token: process.env.WEB3_KEY })
}

function makeFileObjects(objToStore, title) {
	const client = makeStorageClient()
	const blob = new Web3Storage.Blob([JSON.stringify(objToStore)], title, {
		type: 'application/json',
	})

	return new Web3Storage.File([blob], title)
}

async function storeFiles(files) {
	const client = makeStorageClient()
	const cid = await client.put(files)
	return cid
}

async function storeWithProgress(files) {
	console.log(files)
	const onRootCidReady = (cid) => {
		console.log('uploading files with cid:', cid)
	}

	const totalSize = files.map((f) => f.size).reduce((a, b) => a + b, 0)
	let uploaded = 0

	const onStoredChunk = (size) => {
		uploaded += size
		const pct = totalSize / uploaded
		console.log(`Uploading... ${pct.toFixed(2)}% complete`)
	}

	const client = makeStorageClient()

	return client.put(files, { onRootCidReady, onStoredChunk })
}

async function checkStatus(cid) {
	const client = makeStorageClient()
	try {
		const status = await client.status(cid)
		console.log(status)

		return status
	} catch (error) {
		return error
	}
}

module.exports = {
	makeFileObjects,
	storeFiles,
	storeWithProgress,
	checkStatus,
}
