import { PrismaClientUnknownRequestError } from '@prisma/client/runtime/library'
import prisma from '../db'
import { Router } from 'express'
const routesPost = Router()

import { validateBody } from '../middleware/validate.middleware'
import { createPostSchema } from '../schemas/post.schema'

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

routesPost.post('/', validateBody(createPostSchema), async (req, res) => {
  const { title, content, authorId } = req.body
  const authorIdParsed = parseInt(authorId)

  try {
    /*  const verifyData = postSchema.parse({
      title,
      content,
      authorId: authorIdParsed
    })
    console.log(verifyData) */
    /* Validations */
    /*  if (
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
    } */

    // if(!postSchema.parse({title, content, authorIdParsed})){}

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
    // TODO: Ver como quitar el tipo any del error.
  } catch (error: any) {
    console.log(error)
    /* De esta forma typeScript infiere y nos da autocompletado. */
    if (error instanceof PrismaClientUnknownRequestError) {
      console.log(error.message)
      return res.status(400).json({
        msg: 'User not exists',
        data: {
          title,
          content,
          authorId: authorIdParsed
        }
      })
    }
    if (error?.code === 'P2003') {
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
