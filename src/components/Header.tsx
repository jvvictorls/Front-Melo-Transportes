import { Link } from 'react-router-dom';
import Nav from './Nav';

function Header() {
  return (
    <header className="bg-white text-white py-4 border shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/dashboard"
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
