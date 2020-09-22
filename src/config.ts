import path from 'path'
import * as dotEnv from 'dotenv'

interface Config {
	[index: string]: any,
	env: string,
	root: string,
	port: string,
	ip: string,
	domain: string | undefined,
}

if (process.env.NODE_ENV !== 'production') {
	dotEnv.config({
		path: path.join(__dirname, '../.env')
	})
}

const requireProcessEnv = (name: string) => {
	if (!process.env[name]) {
		if (process.env.NODE_ENV !== 'production') {
			console.log('You should set the ' + name + ' environment variable')
		}
		return ''
	}
	return process.env[name]
}

const config: Config = {
	env: process.env.NODE_ENV || 'development',
	root: path.join(__dirname, '..'),
	port: process.env.PORT || '7878',
	ip: process.env.IP || '0.0.0.0',
	domain: requireProcessEnv('DOMAIN'),
}

export default config
