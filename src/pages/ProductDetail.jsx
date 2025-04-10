import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productService } from '../api/productService';

/**
 * Componente ProductDetail
 * 
 * Exibe os detalhes completos de um produto específico
 * Permite editar ou excluir o produto
 */
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Busca os dados do produto quando o componente é montado ou o ID muda
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await productService.getProductById(id);
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar dados do produto. Por favor, tente novamente.');
        console.error('Erro ao buscar produto:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Função para confirmar e processar a exclusão do produto
  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja excluir o produto ${product.name}?`)) {
      try {
        await productService.deleteProduct(id);
        alert('Produto excluído com sucesso!');
        navigate('/');
      } catch (err) {
        setError('Erro ao excluir produto. Por favor, tente novamente.');
        console.error('Erro ao excluir produto:', err);
      }
    }
  };

  // Exibe indicador de carregamento enquanto os dados são buscados
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </div>
    );
  }

  // Exibe mensagem de erro se ocorrer algum problema
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <Link to="/" className="text-primary-500 hover:underline">
          Voltar para a lista de produtos
        </Link>
      </div>
    );
  }

  // Exibe mensagem se o produto não for encontrado
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          Produto não encontrado.
        </div>
        <Link to="/" className="text-primary-500 hover:underline">
          Voltar para a lista de produtos
        </Link>
      </div>
    );
  }

  // Renderiza os detalhes do produto
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Detalhes do Produto</h1>
            <div className="flex space-x-2">
              <Link
                to={`/products/edit/${product.id}`}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Editar
              </Link>
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Excluir
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Seção da imagem do produto */}
            <div className="md:w-1/3 flex justify-center mb-6 md:mb-0">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}                  
                  className="w-48 h-48 rounded-lg object-cover border-4 border-gray-200"
                />
              ) : (
                <div className="w-48 h-48 rounded-lg bg-gray-300 flex items-center justify-center border-4 border-gray-200">
                  <span className="text-gray-600 text-4xl font-bold">
                    {product.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            {/* Seção de informações do produto */}
            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-500 text-sm font-semibold">Nome</h3>
                  <p className="text-gray-900">{product.name}</p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-semibold">Preço</h3>
                  <p className="text-gray-900">R$ {product.price.toFixed(2)}</p>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-semibold">Categoria</h3>
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800">
                    {product.category}
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-semibold">Status</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    product.status === 'disponivel' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status === 'disponivel' ? 'Disponível' : 'Indisponível'}
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-semibold">Estoque</h3>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    product.stock > 0 ? 'bg-primary-100 text-primary-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {product.stock} unidades
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-500 text-sm font-semibold">Atualizado em</h3>
                  <p className="text-gray-900">{new Date(product.updatedAt).toLocaleDateString()}</p>
                </div>
              </div>
              
              {/* Descrição do produto */}
              <div className="mt-6">
                <h3 className="text-gray-500 text-sm font-semibold">Descrição</h3>
                <p className="text-gray-900 mt-2">{product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Link para voltar à lista de produtos */}
      <div className="mt-6">
        <Link to="/" className="text-primary-500 hover:underline">
          ← Voltar para a lista de produtos
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
