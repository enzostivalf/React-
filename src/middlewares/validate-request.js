import { ZodError } from 'zod';

export const validateRequest = (schema) => {
  return async (req, res, next) => {
    try {
      // Verificar conformidade dos dados com o esquema definido
      const sanitizedData = await schema.parseAsync(req.body);
      
      // Atualizar o corpo da requisição com os dados sanitizados
      req.body = sanitizedData;
      
      next();
    } catch (error) {
      // Processar erros específicos de validação
      if (error instanceof ZodError) {
        res.status(400).json({
          message: 'Dados fornecidos não atendem aos requisitos',
          detalhes: error.errors.map(err => ({
            campo: err.path.join('.'),
            problema: err.message
          }))
        });
        return; 
      }
      
      // Lidar com erros inesperados
      res.status(500).json({ message: 'Falha no processamento da solicitação' });
      return; 
    }
  };
};
