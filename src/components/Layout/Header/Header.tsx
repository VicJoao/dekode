import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, LogOut, User } from 'lucide-react';
import { useAuth } from '../../../contexts/AuthContext';
import AuthModal from '../../auth/AuthModal';
import Button from '../../common/Button/Button';
import { HeaderContainer, HeaderContent, Logo, Nav, UserSection } from './styles';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <Logo>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              de<span>kode</span>
            </Link>
          </Logo>
          <Nav>
            <Link to="/">Home</Link>
            {user && <Link to="/dashboard">Dashboard</Link>}
            <Link to="/editor">Editor</Link>
          </Nav>
          <UserSection>
            {user ? (
              <>
                <span>Welcome, {user.email}</span>
                <Button variant="outline" size="small" onClick={handleSignOut}>
                  <LogOut size={16} />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="outline" size="small" onClick={() => setShowAuthModal(true)}>
                <LogIn size={16} />
                Sign In
              </Button>
            )}
          </UserSection>
        </HeaderContent>
      </HeaderContainer>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
};

export default Header;