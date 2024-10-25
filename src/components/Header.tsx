import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GrMenu } from 'react-icons/gr';
import { useState } from 'react';
import Sidebar from './Sidebar';

function Header() {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  return (
    <header
      className="w-full flex items-center justify-center shadow-md z-[1000] fixed top-0 bg-white"
    >
      <div className="w-full flex justify-between ">
        <div
          className="flex items-center justify-between ml-4 space-x-4"
        >
          <GrMenu
            className="lg:hidden xl:hidden 2xl:hidden"
            onClick={ () => setSideBar(!sideBar) }
          />
          <Link
            to="/dashboard"
            className="flex justify-center items-center"
          >
            <img
              src="/src/public/recropped-melo.png"
              alt="melo_transportes"
              className="h-6 xs:h-5 mb-3"
            />
          </Link>
        </div>

        <nav className="flex flex-1 items-center justify-evenly items-center xs:hidden sm:hidden md:hidden">
          <NavLink
            to="/request"
            className="mb-2"
          >
            Solicitar Rota
          </NavLink>
          <NavLink
            to="routes"
            className="mb-2"
          >
            Rotas
          </NavLink>
          <NavLink
            to="/collaborator/register"
            className="mb-2"
          >
            Cadastro de Colaborador
          </NavLink>

          <NavLink
            to="contact"
            className="mb-2"
          >
            Contate-nos
          </NavLink>
        </nav>

        <div
          className="flex items-center justify-between mr-4 space-x-4"
        >
          <button
            className=""
            onClick={ () => navigate('/login') }
          >
            Entrar
          </button>
          <button
            className=""
          >
            Registre-se
          </button>
        </div>
      </div>
      <Sidebar
        isSidebarOpen={ sideBar }
        setSideBar={ setSideBar }
      />
    </header>

  );
}

export default Header;
