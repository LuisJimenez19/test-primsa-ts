import express from 'express'
import { routesUser } from './routes/user.routes'
import { routesPost } from './routes/post.routes'

import cors from 'cors'
const app = express()
app.use(express.json()) // convierte el req.body en un json
app.use(cors()) // permite la conección de diferentes origenes

app.use(express.static('public'))

app.use('/ping', (_req, res) => {
  res.send('pong ' + new Date().toLocaleString())
})

app.use('/api/user', routesUser)
app.use('/api/post', routesPost)

export default app
