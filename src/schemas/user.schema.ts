import { string, z } from 'zod'

export const createUserSchema = z.object({
  name: string().trim().min(3, 'El nombre debe tener más de 3 caracteres')
})
