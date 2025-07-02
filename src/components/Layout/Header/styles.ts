import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  
  span {
    color: #ffd700;
  }
`;

export const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
  
  a {
    color: white;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover {
      color: #ffd700;
    }
  }

  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: white;
  font-size: 0.875rem;

  @media (max-width: 768px) {
    span {
      display: none;
    }
  }
`;