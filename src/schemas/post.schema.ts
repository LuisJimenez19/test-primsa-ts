import { z } from 'zod'

export const createPostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'El título debe ser de al menos 3 caracteres.'),
  content: z
    .string()
    .trim()
    .min(3, 'El contenido debe ser de al menos 3 caracteres.'),
  media: z.string().trim().url('Ingrese una url valida').optional(),
  authorId: z.number().nonnegative('El id del autor debe ser positivo')
})
