import React from 'react';
import Header from './Header';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const showHeader = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!showHeader && <Header />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
