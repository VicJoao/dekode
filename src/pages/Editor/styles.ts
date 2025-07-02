import styled from 'styled-components';

export const EditorContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  color: white;
  gap: 2rem;
`;

export const EditorHeader = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

export const EditorTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const EditorSubtitle = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;
`;

export const EditorContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  flex: 1;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const EditorPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PanelTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: #ffd700;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const Select = styled.select`
  padding: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #ffd700;
    background: rgba(255, 255, 255, 0.15);
  }
  
  option {
    background: #2d2d2d;
    color: white;
  }
`;

export const PreviewPanel = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PreviewContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  padding: 2rem;
`;

export const ExportActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;