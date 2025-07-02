import styled from 'styled-components';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  ${({ size = 'medium' }) => {
    switch (size) {
      case 'small':
        return `
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
      case 'large':
        return `
          padding: 1rem 2rem;
          font-size: 1.125rem;
        `;
      default:
        return `
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
    }
  }}
  
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'secondary':
        return `
          background: rgba(255, 255, 255, 0.2);
          color: white;
          
          &:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
          }
        `;
      case 'outline':
        return `
          background: transparent;
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.3);
          
          &:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.5);
          }
        `;
      default:
        return `
          background: linear-gradient(45deg, #ffd700, #ffed4e);
          color: #333;
          
          &:hover {
            background: linear-gradient(45deg, #ffed4e, #ffd700);
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(255, 215, 0, 0.3);
          }
        `;
    }
  }}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
  }
`;