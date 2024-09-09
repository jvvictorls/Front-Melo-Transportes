import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='w-full flex items-center justify-center shadow-md'>
        <div className="w-3/4 flex  justify-evenly items-center">
          <div className='ml-4'>
            <Link
              to="/dashboard"
              className='flex justify-center items-center'
            >
              <img
                src="/src/public/recropped-melo.png"
                alt="melo_transportes"
                className="h-6 mb-2"
              />
            </Link>
          </div>
          
                <nav className='flex-1 flex items-center justify-center  justify-evenly items-center '>
          <NavLink
          to='/'
          className='mb-2'
          >
            Home
          </NavLink>
          <NavLink
          to='/request'
          className='mb-2'
          >
            Solicitar Rota
          </NavLink>
          <NavLink
          to='routes'
          className='mb-2'
          >
            Rotas
          </NavLink>
                </nav>
          
                <div 
                className='w-1/6 flex items-center justify-between'>
          <button 
          className=''
          >
            Entrar
          </button>
          <button
          className=''
          >
            Registre-se
          </button>
                </div>
        </div>
    </header>
  );
}

export default Header;
