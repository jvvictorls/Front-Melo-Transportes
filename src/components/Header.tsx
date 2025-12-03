import { Link, NavLink, useNavigate } from 'react-router-dom';
import { GrMenu } from 'react-icons/gr';
import { useState, useContext } from 'react';
import Sidebar from './Sidebar';
import ConditionalRender from './ConditionalRender';
import AuthContext from '../context/AuthContext';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const userType = token ? JSON.parse(atob(token.split('.')[1])).type : null;
  console.log(userType);
  const [sideBar, setSideBar] = useState(false);
  const { accessToken, setAccessToken } = useContext(AuthContext);
  return (
    <header
      className="w-full flex items-center justify-center shadow-md z-[1000] bg-white "
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
            to="/"
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
              Solicitar Rota Extra
            </NavLink>
            <NavLink
              to="routes"
              className=""
            >
              Rotas
            </NavLink>
            <ConditionalRender
              condition={ userType === 'admin' || userType === 'superadmin' }
            >
              <NavLink
                to="suplies"
                className=""
              >
                Abastecimentos
              </NavLink>
            </ConditionalRender>
            <NavLink
              to="contact"
              className=""
            >
              Contate-nos
            </NavLink>
          </nav>
        </div>
        <ConditionalRender
          condition={ !accessToken }
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
      <ConditionalRender
        condition={ !!accessToken }
      >
        <div className="flex items-center justify-between mr-4 space-x-4">
          <button
            onClick={ () => {
              setAccessToken(null);
              navigate('/login');
            } }
            className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
          >
            Sair
          </button>
        </div>
      </ConditionalRender>
      <Sidebar
        isSidebarOpen={ sideBar }
        setSideBar={ setSideBar }
      />
    </header>

  );
}

export default Header;
