// import { ErrorRequestHandler } from 'express'
import { IncomingMessage, ServerResponse } from 'http'
import axios /* , { AxiosError } */ from 'axios'
import apiMap from './map'

// todo: move to src/interface
interface ClientSideReq extends IncomingMessage {
  params: { key: string }
  body: { [key: string]: any }
}

interface ApiConfig {
  headers?: { Authorization: string }
  method: any
  validateStatus: (status: number) => boolean
  url: string
  timeout?: number
}

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
    'D-Authorization': 'bXlnb29kczpjanJjanJxa3I0ZHlkZ25sV2tk',
  }
  const apiOptions: any = apiMap(config.key)
  const params = findParamsInUrl(apiOptions.url)
  const requestUrl = makeRequestUrl(apiOptions.url, params, config.data)
  const body = bodyBuilder(apiOptions.data, params, config.data)

  return {
    url: requestUrl,
    method: apiOptions.method,
    headers,
    ...(apiOptions.method.toLowerCase() === 'get' ? { params: body } : { data: body }),
    validateStatus: (status: number) => status >= 200 && status < 500,
    timeout: 10000,
  }
}

const getProxyApiOptions = (config: { [key: string]: any }) => {
  return {
    method: 'post',
    url: `/api/${config.key}`,
    data: config.data,
    validateStatus: (status: number) => status >= 200 && status < 500,
    timeout: 11000,
  }
}

export const api = (
  config: { [key: string]: any },
  req?: IncomingMessage,
  res?: ServerResponse
) => {
  let options: ApiConfig
  if (req && res) options = getApiOptions(config)
  else options = getProxyApiOptions(config)

  console.log('in api function of options', options)
  // eslint-disable-next-line no-return-await
  return axios(options)
    .then(({ data }) => {
      return data
    })
    .catch((error) => {
      if (error.response) {
        console.error('api error.response', error.response)
      } else if (error.request) {
        console.error('api error.request', error.request)
      } else {
        console.error('error')
      }
      return Promise.reject(error)
    })
}

// todo: return data with statusCode
export const proxy = (req: ClientSideReq /* , res?: ServerResponse */) => {
  const config = {
    key: req.params.key,
    data: req.body,
  }

  const options = getApiOptions(config)

  return axios(options)
    .then(({ data }) => {
      console.log('in proxy then', data)
      return data
    })
    .catch((error) => {
      if (error.response) {
        console.error('proxy error.response', error.response)
      } else if (error.request) {
        console.error('proxy error.request', error.request)
      } else {
        console.error('error')
      }
      return Promise.reject(error)
    })
}
