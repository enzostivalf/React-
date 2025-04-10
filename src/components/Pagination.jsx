/**
 * Componente Pagination
 * 
 * Exibe controles de paginação para navegação entre páginas de resultados
 * 
 * @param {number} currentPage - Página atual
 * @param {number} totalPages - Número total de páginas
 * @param {Function} onPageChange - Função para mudar de página
 */
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  // Gera os números das páginas
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  
  // Limita o número de páginas exibidas para melhorar a experiência do usuário
  let pagesToShow = [];
  if (totalPages <= 5) {
    // Se houver 5 ou menos páginas, mostra todas
    pagesToShow = pages;
  } else {
    if (currentPage <= 3) {
      // Se estiver nas primeiras páginas, mostra as 5 primeiras + última
      pagesToShow = [...pages.slice(0, 5), '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      // Se estiver nas últimas páginas, mostra a primeira + últimas 5
      pagesToShow = [1, '...', ...pages.slice(totalPages - 5)];
    } else {
      // Se estiver no meio, mostra a primeira, a última e as páginas ao redor da atual
      pagesToShow = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  }
  
  return (
    <div className="flex justify-center mt-6">
      <nav className="flex space-x-1">
        {/* Botão para página anterior */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded ${
            currentPage === 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
          }`}
        >
          Anterior
        </button>
        
        {/* Botões para páginas específicas */}
        {pagesToShow.map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="px-3 py-1">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded ${
                currentPage === page
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
              }`}
            >
              {page}
            </button>
          )
        ))}
        
        {/* Botão para próxima página */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded ${
            currentPage === totalPages
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
          }`}
        >
          Próxima
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
