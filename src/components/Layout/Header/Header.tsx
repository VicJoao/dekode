import React from 'react';
import { Link } from 'react-router-dom';
import { HeaderContainer, HeaderContent, Logo, Nav } from './styles';

const Header: React.FC = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            de<span>kode</span>
          </Link>
        </Logo>
        <Nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/editor">Editor</Link>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;