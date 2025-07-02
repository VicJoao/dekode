import React from 'react';
import { WindowContainer } from './styles';
import Bar from './Components/Bar';
import Code from './Components/Code';

interface WindowProps {
  title?: string;
  showControls?: boolean;
  controlsStyle?: 'mac' | 'windows';
  children: React.ReactNode;
  className?: string;
}

const Window: React.FC<WindowProps> = ({ 
  title, 
  showControls, 
  controlsStyle, 
  children, 
  className 
}) => {
  return (
    <WindowContainer className={className}>
      <Bar title={title} showControls={showControls} controlsStyle={controlsStyle} />
      <Code>{children}</Code>
    </WindowContainer>
  );
};

export default Window;