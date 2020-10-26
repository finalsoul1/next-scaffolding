import { Request, Response, ErrorRequestHandler, NextFunction } from 'express'
import axios from 'axios'
import apiMap from './map'

const findParamsInUrl = (url: string) => {
	const regexp = /(?::)(\D\w+)/gim
	const params = url.match(regexp)
	return params && params.length > 0 ? params.map((match) => match.replace(':', '')) : []
}

const makeRequestUrl = (url: string, params: Array<string>, data: { [key: string]: any }) => {
	if (!params) return url
	let requestUrl = url
	params.forEach((param) => {
		requestUrl = requestUrl.replace(`:${param}`, data[param])
	})
	return requestUrl
}

const bodyBuilder = (data: any, params: Array<string>, body: any) => {
	const mergedBody: { [index: string]: any } = { ...data, ...body }
	if (!params) return mergedBody
	params.forEach((param) => {
		if (mergedBody[param]) delete mergedBody[param]
	})
	return body
}

const getApiOptions = (config: { [key: string]: any }) => {
	const headers = {
		Authorization: `Basic ${Buffer.from('seoulstore:devteam!').toString('base64')}`,
	}
	const apiOptions: any = apiMap(config.key)
	const params = findParamsInUrl(apiOptions.url)
	const requestUrl = makeRequestUrl(apiOptions.url, params, config.data)
	const body = bodyBuilder(apiOptions.data, params, config.data)

	return {
		url: requestUrl,
		method: apiOptions.method,
		headers,
		...(apiOptions.method === 'get' ? { params: body } : { data: body }),
		validateStatus: (status: number) => status >= 200 && status < 500,
	}
}

// Use for next serverside app
export const api = async (config: { [key: string]: any }, req?: Request) => {
	const options = getApiOptions(config)
	const next = (err: ErrorRequestHandler) => {
		console.log(`Api error from ${req ? 'server' : 'front'}`, err)
		throw err
	}

	return axios(options)
		.then((res) => res.data)
		.catch(next)
}

// because don't need proxy at server side
export const proxy = async (req: Request, res: Response, next: NextFunction) => {
	console.log(req)
	console.log(res)
	console.log(next)
}
