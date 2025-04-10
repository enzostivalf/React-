import { z } from 'zod';

/**
 * Schema de validação para produtos
 * 
 * Define as regras de validação para cada campo do produto
 * Utilizado pelo React Hook Form para validar o formulário
 */
export const productSchema = z.object({
  // Nome do produto: mínimo de 2 caracteres
  name: z.string().min(2, { message: 'Nome deve ter pelo menos 2 caracteres' }),
  
  // Descrição do produto: mínimo de 5 caracteres
  description: z.string().min(5, { message: 'Descrição deve ter pelo menos 5 caracteres' }),
  
  // Preço do produto: deve ser um número positivo
  price: z.coerce.number().positive({ message: 'Preço deve ser um valor positivo' }),
  
  // URL da imagem: deve ser uma URL válida (opcional)
  imageUrl: z.string().url({ message: 'URL da imagem deve ser uma URL válida' }).optional(),
  
  // Categoria do produto: mínimo de 2 caracteres
  category: z.string().min(2, { message: 'Categoria deve ter pelo menos 2 caracteres' }),
  
  // Estoque do produto: deve ser um número inteiro não negativo
  stock: z.coerce.number().int({ message: 'Estoque deve ser um número inteiro' }).nonnegative({ message: 'Estoque não pode ser negativo' }),
  
  // Status do produto: deve ser 'disponivel' ou 'indisponivel'
  status: z.enum(['disponivel', 'indisponivel'], { 
    errorMap: () => ({ message: 'Status deve ser disponivel ou indisponivel' })
  }).default('disponivel'),
});

/**
 * Schema para atualização parcial de produtos
 * 
 * Permite que apenas alguns campos sejam atualizados, tornando todos opcionais
 */
export const productUpdateSchema = productSchema.partial();
