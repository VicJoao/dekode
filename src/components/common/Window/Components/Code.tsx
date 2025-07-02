import React from 'react';
import { WindowContent } from '../styles';

interface CodeProps {
  children: React.ReactNode;
  padding?: string;
}

const Code: React.FC<CodeProps> = ({ children, padding = '20px' }) => {
  return (
    <WindowContent style={{ padding }}>
      {children}
    </WindowContent>
  );
};

export default Code;