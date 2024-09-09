import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="flex border shadow-sm justify-evenly items-center">
        <div className=''>
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

      <nav className='w-1/3 flex items-center justify-center  justify-evenly items-center '>
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
      className='h-full w-1/12 flex items-center justify-center'>
        <button className=''>Login</button>
      </div>
    </header>
  );
}

export default Header;
