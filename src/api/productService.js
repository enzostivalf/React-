import api from './api';

export const productService = {
  // Buscar todos os produtos
  getAllProducts: async () => {
    try {
      const response = await api.get('/api/products');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  },

  // Buscar produto por ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/api/products/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar produto ${id}:`, error);
      throw error;
    }
  },

  // Criar novo produto
  createProduct: async (productData) => {
    try {
      const response = await api.post('/api/products', productData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  },

  // Atualizar produto
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/api/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar produto ${id}:`, error);
      throw error;
    }
  },

  // Excluir produto
  deleteProduct: async (id) => {
    try {
      await api.delete(`/api/products/${id}`);
      return true;
    } catch (error) {
      console.error(`Erro ao excluir produto ${id}:`, error);
      throw error;
    }
  }
};
