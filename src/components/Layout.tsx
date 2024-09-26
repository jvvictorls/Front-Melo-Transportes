import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex w-full flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
