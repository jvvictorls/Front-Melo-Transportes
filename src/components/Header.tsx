import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GrMenu } from 'react-icons/gr';
import { useState, useContext } from 'react';
import Sidebar from './Sidebar';
import AuthContext from '../context/AuthContext';
import ConditionalRender from './ConditionalRender';

function Header() {
  const navigate = useNavigate();
  const [sideBar, setSideBar] = useState(false);
  const { auth } = useContext(AuthContext);
  return (
    <header
      className="w-full flex items-center justify-center shadow-md z-[1000] fixed  bg-white "
    >
      <div className="xs:w-full sm:w-full md:w-full lg:w-3/4 xl:w-2/3 2xl:w-1/2 flex justify-between h-full ">
        <div
          className="flex items-center justify-between space-x-4"
        >
          <GrMenu
            className="lg:hidden xl:hidden 2xl:hidden xs:ml-4 sm:ml-4 md:ml-4"
            onClick={ () => setSideBar(!sideBar) }
          />
          <Link
            to="/dashboard"
            className="flex justify-center items-center"
          >
            <img
              src="/src/public/recropped-melo.png"
              alt="melo_transportes"
              className="h-6 xs:h-5 md:h-5  my-4"
            />
          </Link>

          <nav className="flex flex-1 justify-evenly items-center xs:hidden sm:hidden md:hidden space-x-4">
            <NavLink
              to="/request"
              className=""
            >
              Serviços
            </NavLink>
            <NavLink
              to="routes"
              className=""
            >
              Rotas
            </NavLink>

            <NavLink
              to="contact"
              className=""
            >
              Contate-nos
            </NavLink>
          </nav>
        </div>
        <ConditionalRender
          condition={ auth === false }
        >
          <div
            className="flex items-center justify-between mr-4 space-x-4"
          >
            <button
              className="xs:hidden sm:hidden"
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
        </ConditionalRender>
      </div>

      <Sidebar
        isSidebarOpen={ sideBar }
        setSideBar={ setSideBar }
      />
    </header>

  );
}

export default Header;
