import axios from 'axios';

// Configuração da instância do Axios para requisições HTTP
// Define a URL base e os cabeçalhos padrão para todas as requisições
const api = axios.create({
  baseURL: 'http://localhost:3000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
