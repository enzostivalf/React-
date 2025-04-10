import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
  description: z.string().min(3, { message: 'A descrição deve ter pelo menos 3 caracteres' }),
  price: z.number().positive({ message: 'O preço deve ser um número positivo' }),
  imageUrl: z.string().url({ message: 'A URL da imagem deve ser uma URL válida' }).optional(),
  category: z.string().min(2, { message: 'A categoria deve ter pelo menos 2 caracteres' }),
  stock: z.number().int().nonnegative({ message: 'O estoque deve ser um número inteiro não negativo' }),
  status: z.enum(['disponivel', 'indisponivel']).default('disponivel'),
});

export const productUpdateSchema = productSchema.partial();
