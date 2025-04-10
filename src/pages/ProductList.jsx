import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../api/productService';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

/**
 * Componente ProductList
 * 
 * Exibe a lista de produtos com paginação e opções para adicionar, editar e excluir produtos
 */
const ProductList = () => {
  // Estados para armazenar os produtos e o estado da interface
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para controle da paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  
  // Carrega os produtos quando o componente é montado
  useEffect(() => {
    fetchProducts();
  }, []);
  
  /**
   * Busca a lista de produtos da API
   */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar produtos. Por favor, tente novamente.');
      console.error('Erro ao buscar produtos:', err);
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Exclui um produto e atualiza a lista
   * @param {string} productId - ID do produto a ser excluído
   */
  const handleDeleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      // Atualiza a lista de produtos após a exclusão
      setProducts(products.filter(product => product.id !== productId));
      // Exibe mensagem de sucesso
      alert('Produto excluído com sucesso!');
    } catch (err) {
      setError('Erro ao excluir produto. Por favor, tente novamente.');
      console.error('Erro ao excluir produto:', err);
    }
  };
  
  // Lógica de paginação
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);
  
  /**
   * Altera a página atual da paginação
   * @param {number} pageNumber - Número da página a ser exibida
   */
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  // Exibe indicador de carregamento enquanto os dados são buscados
  if (loading) {
    return (
      <div className="w-full px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-primary-800">Produtos</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full px-4 py-8">
      {/* Cabeçalho com título e botão para adicionar novo produto */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary-800">Produtos</h1>
        <Link 
          to="/products/new" 
          className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md flex items-center shadow-sm transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Novo Produto
        </Link>
      </div>
      
      {/* Exibe mensagem de erro se houver */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Exibe mensagem quando não há produtos ou a lista de produtos */}
      {products.length === 0 ? (
        <div className="bg-gray-100 p-8 text-center rounded-md">
          <p className="text-gray-600">Nenhum produto encontrado.</p>
          <Link 
            to="/products/new" 
            className="inline-block mt-4 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors duration-200"
          >
            Adicionar Produto
          </Link>
        </div>
      ) : (
        <>
          {/* Grid de cartões de produtos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onDelete={handleDeleteProduct} 
              />
            ))}
          </div>
          
          {/* Componente de paginação */}
          {products.length > productsPerPage && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
