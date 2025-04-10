import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '../schemas/productSchema';
import { productService } from '../api/productService';

/**
 * Componente ProductForm
 * 
 * Formulário para criação e edição de produtos
 * Utiliza React Hook Form para gerenciamento de formulário e Zod para validação
 */
const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);

  // Configuração do formulário com React Hook Form e validação Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: zodResolver(isEditMode ? productSchema.partial() : productSchema),
    defaultValues: {
      status: 'disponivel',
      stock: 0
    }
  });

  // Carrega os dados do produto quando estiver em modo de edição
  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          setLoading(true);
          const data = await productService.getProductById(id);
          
          // Preenche os campos do formulário com os dados do produto
          Object.keys(data).forEach(key => {
            if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
              setValue(key, data[key]);
            }
          });
          
          setError(null);
        } catch (err) {
          setError('Erro ao carregar dados do produto. Por favor, tente novamente.');
          console.error('Erro ao buscar produto:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, isEditMode, setValue]);

  // Função para processar o envio do formulário
  const onSubmit = async (data) => {
    try {
      setSubmitLoading(true);
      setError(null);
      
      if (isEditMode) {
        await productService.updateProduct(id, data);
        alert('Produto atualizado com sucesso!');
      } else {
        await productService.createProduct(data);
        alert('Produto criado com sucesso!');
        reset();
      }
      
      navigate('/');
    } catch (err) {
      console.error('Erro ao salvar produto:', err);
      
      if (err.response && err.response.status === 409) {
        setError('Este produto já existe. Por favor, use outro nome.');
      } else {
        setError('Erro ao salvar produto. Por favor, tente novamente.');
      }
    } finally {
      setSubmitLoading(false);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6 text-primary-800">
            {isEditMode ? 'Editar Produto' : 'Novo Produto'}
          </h1>
          
          {/* Exibe mensagem de erro se houver */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo: Nome do produto */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Produto *
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.name ? 'border-red-500 text-red-700' : 'border-gray-300 text-gray-700'
                } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                placeholder="Digite o nome do produto"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            
            {/* Campo: Descrição do produto */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Descrição do Produto *
              </label>
              <textarea
                id="description"
                rows="3"
                {...register('description')}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.description ? 'border-red-500 text-red-700' : 'border-gray-300 text-gray-700'
                } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                placeholder="Digite a descrição do produto"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Campo: Preço do produto */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Preço do Produto *
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  {...register('price')}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.price ? 'border-red-500 text-red-700' : 'border-gray-300 text-gray-700'
                  } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>
              
              {/* Campo: Estoque do produto */}
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                  Estoque do Produto *
                </label>
                <input
                  id="stock"
                  type="number"
                  {...register('stock')}
                  className={`w-full px-3 py-2 border rounded-md ${
                    errors.stock ? 'border-red-500 text-red-700' : 'border-gray-300 text-gray-700'
                  } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                  placeholder="0"
                />
                {errors.stock && (
                  <p className="mt-1 text-sm text-red-600">{errors.stock.message}</p>
                )}
              </div>
            </div>
            
            {/* Campo: Categoria do produto */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Categoria do Produto *
              </label>
              <input
                id="category"
                type="text"
                {...register('category')}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.category ? 'border-red-500 text-red-700' : 'border-gray-300 text-gray-700'
                } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                placeholder="Digite a categoria"
              />
              {errors.category && (
                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
              )}
            </div>
            
            {/* Campo: URL da imagem do produto */}
            <div>
              <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 mb-1">
                URL da Imagem do Produto
              </label>
              <input
                id="imageUrl"
                type="text"
                {...register('imageUrl')}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.imageUrl ? 'border-red-500 text-red-700' : 'border-gray-300 text-gray-700'
                } placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
                placeholder="https://exemplo.com/imagem.jpg"
              />
              {errors.imageUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.imageUrl.message}</p>
              )}
            </div>
            
            {/* Campo: Status do produto */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status do Produto
              </label>
              <select
                id="status"
                {...register('status')}
                className={`w-full px-3 py-2 border rounded-md ${
                  errors.status ? 'border-red-500 text-red-700' : 'border-gray-300 text-gray-700'
                } focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500`}
              >
                <option value="disponivel">Disponível</option>
                <option value="indisponivel">Indisponível</option>
              </select>
              {errors.status && (
                <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
              )}
            </div>
            
            {/* Botões de ação do formulário */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-4 bg-none py-2 border border-gray-300 rounded-md text-gray-700"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={submitLoading}
                className={`px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md flex items-center ${
                  submitLoading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {submitLoading && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isEditMode ? 'Atualizar' : 'Criar'} Produto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
