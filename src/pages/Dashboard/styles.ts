import styled from 'styled-components';

export const DashboardContainer = styled.div`
  flex: 1;
  padding: 2rem;
  color: white;
`;

export const DashboardHeader = styled.div`
  max-width: 1200px;
  margin: 0 auto 2rem;
  text-align: center;
`;

export const DashboardTitle = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const DashboardSubtitle = styled.p`
  font-size: 1.125rem;
  opacity: 0.9;
  margin-bottom: 2rem;
`;

export const Gallery = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 2rem;
`;

export const CodeCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

export const CodePreview = styled.div`
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
`;

export const CodeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CodeTitle = styled.h3`
  font-size: 1.125rem;
  margin: 0;
  color: #ffd700;
`;

export const CodeLanguage = styled.span`
  background: rgba(255, 215, 0, 0.2);
  color: #ffd700;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  opacity: 0.7;
`;

export const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

export const EmptyTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

export const EmptyDescription = styled.p`
  margin-bottom: 2rem;
`;