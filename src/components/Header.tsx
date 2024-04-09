import { Link } from 'react-router-dom';
import Nav from './Nav';

function Header() {
  return (
    <header className="bg-blue-gray text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
        >
          <img
            src="/src/public/recropped-melo.png"
            alt="melo_transportes"
            className="h-12"
          />
        </Link>
        <Nav />
      </div>
    </header>
  );
}

export default Header;
