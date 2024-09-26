import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GrMenu } from 'react-icons/gr';

function Header() {
  const navigate = useNavigate();
  const [toggleMenu, setToggleMenu] = useState(true);
  const { innerWidth } = window;
  const [width, setWidth] = useState(innerWidth);
  useEffect(
    () => {
      setWidth(innerWidth);
    },
    [innerWidth, width],
  );
  return (
    width > 768
      ? (
        <header
          className="flex items-center justify-center shadow-md"
          hidden={ toggleMenu }
        >
          <div className="w-3/4 flex justify-evenly items-center">
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

            <nav className="flex flex-1 items-center justify-evenly items-center ">
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
      )
      : (
        <header
          className="flex items-center justify-center shadow-md"
        >
          <div className="flex w-full justify-between items-center px-4 py-2">
            <GrMenu size={ 24 } />
            <img
              src="/src/public/recropped-melo.png"
              alt="melo_transportes"
              className="h-6 mb-2"
            />
          </div>
        </header>
      )
  );
}

export default Header;
