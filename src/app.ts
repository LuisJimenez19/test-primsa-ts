import express from 'express'
import { routesUser } from './routes/user.routes'
import { routesPost } from './routes/post.routes'

import cors from 'cors'
const app = express()
app.use(express.json())
app.use(cors())
app.use('/ping', (_req, res) => {
  res.send('pong ' + new Date().toLocaleString())
})

app.use('/api/user', routesUser)
app.use('/api/post', routesPost)

export default app
