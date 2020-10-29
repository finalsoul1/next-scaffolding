import { Router, Request, Response } from 'express'
import next from 'next'
import express from './express'
import { proxy } from '~services/api'

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000
const router = Router()

router.post('/api/:key', proxy)

router.get('*', (req: Request, res: Response) => {
  return handle(req, res)
})

app.prepare().then(() => {
  const server = express(router)

  server.listen(port, (err?: any) => {
    if (err) throw err
    console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
  })
})
