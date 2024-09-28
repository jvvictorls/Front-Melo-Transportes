import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

function Layout() {
  const [sideBar, setSideBar] = useState(true);
  return (
    sideBar ? (
      <div
        className="flex flex-col"
      >
        <Header />
        <div className="flex w-full h-screen flex-grow">
          <Outlet />
        </div>
        <Footer />
      </div>
    ) : (
      <Sidebar
        isSidebarOpen={ sideBar }
        setSideBar={ setSideBar }
      />
    ));
}

export default Layout;
