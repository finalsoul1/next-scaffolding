import next from 'next'
// import * as express from 'express'
import config from './config'

const dev = config.env !== 'production'
const app = next({ dir: './src', dev })
const express = require('express')
const router = express.Router()

app.prepare().then(() => {
	const server = express(router)

	server.on('clientError', (err: any, socket: any) => {
		console.error('Server failed with clientError: %s', err)
		socket.end('HTTP/1.1 400 Bad Request\r\n\r\n')
	})

	setImmediate(() => {
		server.listen(config.port, config.ip, () => {
			console.log('Express server listening on http://%s:%d, in %s mode', config.ip, config.port, config.env)
		})
	})
})