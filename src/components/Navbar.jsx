import { Link } from 'react-router-dom';

/**
 * Componente Navbar
 * 
 * Barra de navegação principal da aplicação que exibe o logo e links de navegação
 */
const Navbar = () => {
  return (
    <>
      {/* Cabeçalho com o nome da aplicação */}
      <div className="bg-primary-600 text-white py-1 text-center font-bold tracking-wider uppercase">
        <Link to="/" className="text-xl font-bold">Enzo</Link>
      </div>
      {/* Barra de navegação principal */}
      <nav className="bg-primary-800 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          {/* Links de navegação */}
          <div className="flex gap-8">
            <Link to="/" className="hover:text-primary-200 transition-colors duration-200">Produtos</Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
