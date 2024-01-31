import prisma from '../db'

export const getUsers = async ({
  includePosts = true
}: {
  includePosts?: boolean
}) => {
  try {
    const users = await prisma.user.findMany({
      include: { posts: includePosts }
    })
    return users
  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}

export const createUser = async ({ name }: { name: string }) => {
  try {
    const userCreated = await prisma.user.create({
      data: {
        name
      }
    })
    return userCreated

  } catch (error: any) {
    console.log(error)
    throw new Error(error)
  }
}
