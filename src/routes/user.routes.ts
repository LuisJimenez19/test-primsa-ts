import { Router } from 'express'
import { createUser, getUsers } from '../services/users'
import { createUserSchema } from '../schemas/user.schema'
import { ZodError } from 'zod'
import { validateBody } from '../middleware/validate.middleware'

const routesUser = Router()

/* Get all users */
routesUser.get('/', async (_req, res) => {
  try {
    const users = await getUsers({ includePosts: true })
    console.log({ users })

    if (users.length === 0) {
      return res.json({
        msg: 'There are not users yet',
        data: users
      })
    }
    res.json({
      msg: 'Users',
      data: users
    })
  } catch (error) {
    console.log(error)
    return res.status(500)
  }

  return
})

/* Create users */
routesUser.post('/', validateBody(createUserSchema), async (req, res) => {
  try {
    const data = req.body
    const userCreated = await createUser({ name: data.name })

    if (userCreated) {
      return res.status(200).json({
        msg: 'User create successfully',
        data: userCreated
      })
    }

    return res.status(400).json({
      msg: 'Could not create user'
    })
  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      const issues = error.issues
      const responseError = {
        msg: issues[0].message
      }
      console.log(responseError)
      return res.status(400).json(responseError)
    }

    return res.status(500).json({
      msg: 'Error server'
    })
  }
})

export { routesUser }
