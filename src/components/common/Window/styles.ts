import styled from 'styled-components';

export const WindowContainer = styled.div`
  background: #1e1e1e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  max-width: 100%;
  margin: 0 auto;
`;

export const WindowHeader = styled.div`
  background: #2d2d2d;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #3e3e3e;
`;

export const WindowControls = styled.div`
  display: flex;
  gap: 8px;
`;

export const WindowButton = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ color }) => color};
  cursor: pointer;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.8;
  }
`;

export const WindowTitle = styled.div`
  color: #d4d4d4;
  font-size: 13px;
  font-weight: 500;
  margin-left: 8px;
`;

export const WindowContent = styled.div`
  background: #1e1e1e;
  color: #d4d4d4;
  font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.5;
  overflow-x: auto;
`;