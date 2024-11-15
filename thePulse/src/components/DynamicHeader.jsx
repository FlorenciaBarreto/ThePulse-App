import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import AdminHeader from './AdminHeader';

function DynamicHeader() {
  const location = useLocation();

  if (location.pathname.startsWith('/choose') || location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/template-demo')) {
    // Aquí puedes añadir más rutas si es necesario
    return <AdminHeader />;
  }

  return <Header />;
}

export default DynamicHeader;