// src/components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Header from './Header';

function Layout() {
  return (
    <div className="flex flex-col min-h-screen space-y-16">
      {/* Header */}
      <Header />

      {/* Main Content + Sidebar se quiser */}
      <div className="flex flex-1 max-w-full">

        {/* Conteúdo principal */}
        <main className="flex-1 max-w-full">
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        © 2025 João Victor
      </footer>
    </div>
  );
}

export default Layout;
