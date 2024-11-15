import React from 'react';


const sizes = {
  small: 8,
  medium: 45,
  large: 52,
  
};

// Componente WhiteSpace
const WhiteSpace = ({ size = 'medium' }) => {
  
  const marginSize = sizes[size] ? sizes[size] : sizes.medium; 


  return <div style={{ margin: marginSize }} />;
};

export default WhiteSpace;
