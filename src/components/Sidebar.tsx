import { NavLink, useNavigate } from 'react-router-dom';
import { GrMenu } from 'react-icons/gr';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import ConditionalRender from './ConditionalRender';
import { logout } from '../services/request';

type SidebarProps = {
  isSidebarOpen: boolean;
  setSideBar: (value: boolean) => void;
};

const requestLogout = async (endpoint: string) => {
  await logout(endpoint);
};

export default function Sidebar({ isSidebarOpen, setSideBar }: SidebarProps) {
  const navigate = useNavigate();
  const { accessToken, setAccessToken } = useContext(AuthContext);
  return (
    <div
      className={ `flex flex-col 
        fixed top-0 left-0 m-0 pl-0 h-full w-full bg-gray-900 text-white transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-40` }
    >
      <GrMenu
        className="lg:hidden xl:hidden m-4"
        onClick={ () => setSideBar(!isSidebarOpen) }
      />
      <div
        className="flex flex-col justify-between h-full p-4"
      >
        <nav className="flex flex-col justify-left">
          <NavLink
            to="/request"
            className="py-4 text-left hover:bg-gray-700"
            onClick={ () => setSideBar(!isSidebarOpen) }
          >
            Solicitar Rota
          </NavLink>
          <NavLink
            to="routes"
            className="py-4 text-left hover:bg-gray-700"
            onClick={ () => setSideBar(!isSidebarOpen) }
          >
            Rotas
          </NavLink>
          <NavLink
            to="collaborator/register"
            className="py-4 text-left hover:bg-gray-700"
            onClick={ () => setSideBar(!isSidebarOpen) }
          >
            Cadastro de Colaborador
          </NavLink>
          <NavLink
            to="contact"
            className="py-4 text-left hover:bg-gray-700"
            onClick={ () => setSideBar(!isSidebarOpen) }
          >
            Contate-nos
          </NavLink>
        </nav>
        <div
          className="flex flex-col space-y-4"
        >
          <button
            className={ accessToken || accessToken === '' ? 'bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded' : 'bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded' }
            onClick={ () => {
              if (accessToken) {
                requestLogout('/auth/logout');
                setAccessToken('');
                localStorage.clear();
                sessionStorage.clear();
              }
              setSideBar(!isSidebarOpen);
              navigate('/login', { replace: true });
            } }
          >
            {accessToken || accessToken === '' ? 'Logout' : 'Login'}
          </button>
          <ConditionalRender
            condition={ !accessToken && accessToken !== '' }
          >
            <button
              className="p-2"
            >
              Registrar-se
            </button>
          </ConditionalRender>
        </div>
      </div>
    </div>
  );
}
