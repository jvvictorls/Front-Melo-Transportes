import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-white flex">
      <div>
        <img src="" alt="" />
      </div>
      <nav
        className='mx-auto flex max-w-7xl
         items-center justify-between p-6 lg:px-8" aria-label="Global'
      >
        <ul className="flex">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about">
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
