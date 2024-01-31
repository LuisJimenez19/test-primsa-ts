import prisma from '../db'
import { Router } from 'express'

const routesPost = Router()

/* Get all posts */
routesPost.get('/', async (_, res) => {
  try {
    const posts = await prisma.post.findMany()

    if (posts.length === 0) {
      return res.json({
        msg: 'There are not post yet',
        data: posts
      })
    }

    return res.json({
      msg: 'Posts',
      data: {
        posts
      }
    })
  } catch (error) {
    return res.status(500).json({
      msg: 'Error server'
    })
  }
})

/* Create a post */

routesPost.post('/', async (req, res) => {
  const { title, content, authorId } = req.body
  const authorIdParsed = parseInt(authorId)
  try {
    /* Validations */
    if (
      typeof title !== 'string' ||
      typeof content !== 'string' ||
      !Number.isInteger(authorIdParsed)
    ) {
      return res.status(400).json({
        msg: 'Invalid data',
        data: {
          title,
          content,
          authorIdParsed
        }
      })
    }

    const postCreated = await prisma.post.create({
      data: {
        title,
        content,
        authorId: authorIdParsed
      }
    })

    return res.json({
      msg: 'Post create successfully',
      data: postCreated
    })
  } catch (error: any) {
    console.log(error)
    if (error.code === 'P2003') {
      return res.status(400).json({
        msg: 'User not exists',
        authorIdParsed
      })
    }
    return res.status(500).json({
      msg: 'Server error'
    })
  }
})

export { routesPost }
