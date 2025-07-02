import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
`;

export const ModalContent = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

export const ModalTitle = styled.h2`
  color: white;
  margin: 0;
  font-size: 1.5rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.25rem;
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 0.75rem;
  border: none;
  background: ${({ active }) =>
    active ? 'rgba(255, 215, 0, 0.2)' : 'transparent'};
  color: ${({ active }) => (active ? '#ffd700' : 'white')};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: 500;

  &:hover {
    background: ${({ active }) =>
      active ? 'rgba(255, 215, 0, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ErrorMessage = styled.div`
  color: #ff6b6b;
  background: rgba(255, 107, 107, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(255, 107, 107, 0.3);
  font-size: 0.875rem;
`;

export const SuccessMessage = styled.div`
  color: #51cf66;
  background: rgba(81, 207, 102, 0.1);
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(81, 207, 102, 0.3);
  font-size: 0.875rem;
`;