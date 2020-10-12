import express, {Request, Response, Router} from 'express'
import next from 'next'

const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
// const app = next({ dir: './src', dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000
const router = Router()

router.get('*', (req: Request, res: Response) => {
  return handle(req, res)
});

(async () => {
  try {
    await app.prepare()
    const server = express()
    server.use(router)

    server.listen(port, (err?: any) => {
      if (err) throw err
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
    })
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
