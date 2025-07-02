import React from 'react';
import { WindowHeader, WindowControls, WindowButton, WindowTitle } from '../styles';

interface BarProps {
  title?: string;
  showControls?: boolean;
  controlsStyle?: 'mac' | 'windows';
}

const Bar: React.FC<BarProps> = ({ 
  title = 'Untitled', 
  showControls = true, 
  controlsStyle = 'mac' 
}) => {
  const macColors = ['#ff5f57', '#ffbd2e', '#28ca42'];
  const windowsColors = ['#ff5f57', '#ffbd2e', '#28ca42'];
  
  const colors = controlsStyle === 'mac' ? macColors : windowsColors;

  return (
    <WindowHeader>
      {showControls && (
        <WindowControls>
          {colors.map((color, index) => (
            <WindowButton key={index} color={color} />
          ))}
        </WindowControls>
      )}
      <WindowTitle>{title}</WindowTitle>
    </WindowHeader>
  );
};

export default Bar;