import Zk from '@nuid/zk'
import fetch from 'node-fetch'

async function start() {
	const user = {
		email: 'jdoe@gmail.com',
		credential: Zk.verifiableFromSecret('password'),
	}

	const response = await fetch('http://localhost:5000/v1/register', {
		method: 'post',
		body: JSON.stringify(user),
		headers: { 'Content-Type': 'application/json' },
	})

	const data = await response.json()
	console.log(data)
}

start()
