// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />
      {/* Conteúdo principal */}
      <main className="flex flex-grow w-full justify-center items-center">
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
