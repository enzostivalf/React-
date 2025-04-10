import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

/**
 * Componente Layout
 * 
 * Define a estrutura básica do layout da aplicação, incluindo a barra de navegação
 * e o conteúdo principal que será renderizado através do Outlet do React Router
 */
const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Barra de navegação superior */}
      <Navbar />
      {/* Área principal onde o conteúdo das rotas será renderizado */}
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
