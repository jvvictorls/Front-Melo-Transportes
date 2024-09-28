import { NavLink } from 'react-router-dom';
import { GrMenu } from 'react-icons/gr';

type SidebarProps = {
  isSidebarOpen: boolean;
  setSideBar: (value: boolean) => void;
};

export default function Sidebar({ isSidebarOpen, setSideBar }: SidebarProps) {
  return (
    <nav
      className={ `fixed top-0 left-0 m-0 pl-0 h-full w-full bg-gray-900 text-white transform ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out z-40` }
    >
      <GrMenu
        className="lg:hidden xl:hidden"
        onClick={ () => setSideBar(!isSidebarOpen) }
      />
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
        to="registerCollaborator"
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
  );
}
