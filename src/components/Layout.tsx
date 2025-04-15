import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function Layout() {
  return (
    <div
      className="min-h-screen flex flex-col"
    >
      <Header />
      <div className="flex w-full min-h-screen bg-slate-200">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
