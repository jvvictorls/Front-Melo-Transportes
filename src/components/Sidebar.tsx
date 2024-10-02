import { NavLink, useNavigate } from 'react-router-dom';
import { GrMenu } from 'react-icons/gr';

type SidebarProps = {
  isSidebarOpen: boolean;
  setSideBar: (value: boolean) => void;
};

export default function Sidebar({ isSidebarOpen, setSideBar }: SidebarProps) {
  const navigate = useNavigate();
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
          >
            Solicitar Rota
          </NavLink>
          <NavLink
            to="routes"
            className="py-4 text-left hover:bg-gray-700"
          >
            Rotas
          </NavLink>
          <NavLink
            to="registerCollaborator"
            className="py-4 text-left hover:bg-gray-700"
          >
            Cadastro de Colaborador
          </NavLink>
          <NavLink
            to="contact"
            className="py-4 text-left hover:bg-gray-700"
          >
            Contate-nos
          </NavLink>
        </nav>
        <div
          className="flex flex-col space-y-4"
        >
          <button
            className="bg-gray-700 hover:bg-gray-500 p-2"
            onClick={ () => {
              setSideBar(!isSidebarOpen);
              navigate('/login');
            } }
          >
            Entrar
          </button>
          <button
            className="p-2"
          >
            Registrar-se
          </button>
        </div>
      </div>
    </div>
  );
}
