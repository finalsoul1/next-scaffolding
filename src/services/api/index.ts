import { Request, Response, ErrorRequestHandler, NextFunction } from 'express'
import axios from 'axios'
import apiMap from './map'

const _findParamsInUrl = (url: string) => {
  const regexp = /(?::)(\D\w+)/gim
  const params = url.match(regexp)
  return params && params.length > 0 ? params.map((match) => match.replace(':', '')) : []
}


const _makeRequestUrl = (url: string, params: Array<string>, data: { [key: string]: any }) => {
  if (!params) return url
  let requestUrl = url
  params.forEach((param) => {
    requestUrl = requestUrl.replace(`:${param}`, data[param])
  })
  return requestUrl
}

const _bodyBuilder = (data: object, params: Array<string>, body: object) => {
  const _body: { [index: string]: any } = Object.assign({}, data, body)
  if (!params) return _body
  params.forEach((param) => {
    if (_body[param]) delete _body[param]
  })
  return _body
}

const _getApiOptions = (config: { [key: string]: any }) => {
  const headers = {
    'Authorization': 'Basic ' + Buffer.from('seoulstore:devteam!').toString('base64'),
  }
  const apiOptions: any = apiMap(config.key)
  const params = _findParamsInUrl(apiOptions.url)
  const requestUrl = _makeRequestUrl(apiOptions.url, params, config.data)
  const body = _bodyBuilder(apiOptions.data, params, config.data)

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
  const options = _getApiOptions(config)
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