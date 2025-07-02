import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { LayoutContainer, MainContent } from './styles';

const AppLayout: React.FC = () => {
  return (
    <LayoutContainer>
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default AppLayout;