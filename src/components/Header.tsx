import { Link, NavLink, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full flex items-center justify-center shadow-md">
      <div className="w-3/4 flex  justify-evenly items-center">
        <div className="ml-4">
          <Link
            to="/dashboard"
            className="flex justify-center items-cente"
          >
            <img
              src="/src/public/recropped-melo.png"
              alt="melo_transportes"
              className="h-6 mb-2"
            />
          </Link>
        </div>

        <nav className="flex-1 flex items-center justify-center justify-evenly items-center ">
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

        <div
          className="w-1/6 flex items-center justify-between"
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
    </header>
  );
}

export default Header;
