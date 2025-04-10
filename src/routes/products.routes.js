import { Router } from 'express';
import { db } from '../db/index.js';
import { products } from '../db/schema/products.js';
import { eq } from 'drizzle-orm';
import { productSchema, productUpdateSchema } from '../schemas/product.schema.js';
import { validateRequest } from '../middlewares/validate-request.js';

const router = Router();

// Recuperar todos os itens do catálogo
router.get('/', async (req, res) => {
  try {
    const allProducts = await db.select().from(products);
    res.status(200).json(allProducts);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Localizar item específico por identificador
router.get('/:id', async (req, res) => {
  try {
    const itemId = Number(req.params.id);
    
    if (isNaN(itemId)) {
      res.status(400).json({ message: 'Identificador inválido fornecido' });
      return;
    }
    
    const catalogItem = await db.select().from(products).where(eq(products.id, itemId));
    
    if (catalogItem.length === 0) {
      res.status(404).json({ message: 'Item não localizado no catálogo' });
      return;
    }
    
    res.status(200).json(catalogItem[0]);
  } catch (error) {
    console.error('Falha ao localizar item específico:', error);
    res.status(500).json({ message: 'Falha no processamento da solicitação' });
  }
});

// Criar novo produto
router.post('/', validateRequest(productSchema), async (req, res) => {
  try {
    const result = await db.insert(products).values(req.body).$returningId();
    res.status(201).json(result[0]);
  } catch (error) {
    console.error('Falha ao adicionar novo item:', error);
    res.status(500).json({ message: 'Falha no processamento da solicitação' });
  }
});

// Atualizar produto
router.put('/:id', validateRequest(productUpdateSchema), async (req, res) => {
  try {
    const itemId = Number(req.params.id);
    
    if (isNaN(itemId)) {
      res.status(400).json({ message: 'Identificador inválido fornecido' });
      return;
    }
    
    // Confirmar existência do item
    const existingItem = await db.select().from(products).where(eq(products.id, itemId));
    
    if (existingItem.length === 0) {
      res.status(404).json({ message: 'Item não localizado no catálogo' });
      return;
    }
    
    // Atualizar produto
    await db.update(products)
      .set({
        ...req.body,
        updatedAt: new Date()
      })
      .where(eq(products.id, itemId));
    
    // Buscar o produto atualizado
    const updatedProduct = await db.select().from(products).where(eq(products.id, itemId));
    
    res.status(200).json(updatedProduct[0]);
  } catch (error) {
    console.error('Falha ao modificar informações do item:', error);
    res.status(500).json({ message: 'Falha no processamento da solicitação' });
  }
});

// Remover item
router.delete('/:id', async (req, res) => {
  try {
    const itemId = Number(req.params.id);
    
    if (isNaN(itemId)) {
      res.status(400).json({ message: 'Identificador inválido fornecido' });
      return;
    }
    
    // Verificar se o produto existe
    const existingProduct = await db.select().from(products).where(eq(products.id, itemId));
    
    if (existingProduct.length === 0) {
      res.status(404).json({ message: 'Item não localizado no catálogo' });
      return;
    }
    
    await db.delete(products).where(eq(products.id, itemId));
    
    res.status(204).send();
  } catch (error) {
    console.error('Falha ao remover item do catálogo:', error);
    res.status(500).json({ message: 'Falha no processamento da solicitação' });
  }
});

export default router;
