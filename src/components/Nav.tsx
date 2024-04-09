import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav>
      <ul className="flex">
        <li>
          <NavLink to="/" end className="mr-4 hover:text-gray-400">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="hover:text-gray-400">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
