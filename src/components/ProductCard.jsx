import { Link } from 'react-router-dom';

/**
 * Componente ProductCard
 * 
 * Exibe um cartão de produto com informações básicas e botões de ação
 * 
 * @param {Object} product - Objeto contendo dados do produto
 * @param {Function} onDelete - Função para lidar com a exclusão do produto
 */
const ProductCard = ({ product, onDelete }) => {
  // Função para confirmar e processar a exclusão de um produto
  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja excluir o produto ${product.name}?`)) {
      onDelete(product.id);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex items-center space-x-4">
        {/* Exibe a imagem do produto se disponível */}
        {product.imageUrl && (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="size-16 rounded-sm object-cover"
          />
        )}
        {/* Exibe um placeholder com a inicial do produto se não houver imagem */}
        {!product.imageUrl && (
          <div className="size-16 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-lg font-bold">
              {product.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-600">{product.name}</h3>
          <p className="text-gray-600">R$ {product.price.toFixed(2)}</p>
          <div className="flex space-x-2 mt-1">
            {/* Badge para categoria */}
            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
              {product.category}
            </span>
            {/* Badge para status (disponível/indisponível) */}
            <span className={`px-2 py-1 text-xs rounded-full ${
              product.status === 'disponivel' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {product.status}
            </span>
            {/* Badge para estoque */}
            <span className={`px-2 py-1 text-xs rounded-full ${
              product.stock > 0 ? 'bg-blue-100 text-blue-800' : 'bg-amber-100 text-amber-800'
            }`}>
              Estoque: {product.stock}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          {/* Botão para visualizar detalhes do produto */}
          <Link 
            to={`/products/${product.id}`} 
            className="p-1.5 rounded-full text-blue-600 transition-colors duration-200"
            title="Visualizar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </Link>
          {/* Botão para editar produto */}
          <Link 
            to={`/products/edit/${product.id}`} 
            className="p-1.5 rounded-full text-blue-600 transition-colors duration-200"
            title="Editar"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </Link>
          {/* Botão para excluir produto */}
          <button 
            onClick={handleDelete} 
            className="p-1.5 rounded-full bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors duration-200"
            title="Excluir"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
