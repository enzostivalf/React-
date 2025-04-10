import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Layout from './components/Layout';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import ProductForm from './pages/ProductForm';

/**
 * Configuração do React Query
 * 
 * Cria uma instância do QueryClient para gerenciar o cache e as requisições
 * da aplicação usando o TanStack Query (React Query)
 */
const queryClient = new QueryClient();

/**
 * Componente principal da aplicação
 * 
 * Define a estrutura de rotas e os providers necessários para o funcionamento
 * da aplicação, incluindo o React Router e o React Query
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          {/* Layout principal que envolve todas as páginas */}
          <Route path="/" element={<Layout />}>
            {/* Rota para a lista de produtos (página inicial) */}
            <Route index element={<ProductList />} />
            {/* Rota para visualizar detalhes de um produto específico */}
            <Route path="products/:id" element={<ProductDetail />} />
            {/* Rota para criar um novo produto */}
            <Route path="products/new" element={<ProductForm />} />
            {/* Rota para editar um produto existente */}
            <Route path="products/edit/:id" element={<ProductForm />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
