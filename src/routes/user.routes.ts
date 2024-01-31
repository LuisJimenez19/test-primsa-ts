import { Router } from 'express'
import { createUser, getUsers } from '../services/users'

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
routesUser.post('/', async (req, res) => {
  const { name } = req.body

  if (typeof name !== 'string') {
    return res.status(400).json({
      msg: 'Name is missing or it must be a string '
    })
  }

  try {
    const userCreated = await createUser({ name })

    if (userCreated) {
      return res.status(200).json({
        msg: 'User create successfully',
        data: userCreated
      })
    }

    return res.status(400).json({
      msg: 'Could not create user'
    })
  } catch (error: any) {
    console.log(error.code)
    res.status(500).json({
      msg: 'Error server'
    })
  }
  return
})

export { routesUser }
