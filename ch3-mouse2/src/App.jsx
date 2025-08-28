import React, { useState, useCallback } from 'react'
import ReactDom from 'react-dom'
import './App.css'

// svg canvas config
const width=960;
const height=500;
const radius=20;
const center_x=(width/2);
const center_y=(height/2); 
const initialMousePosition = { x: center_x, y: center_y };

const App = () => {
  const [mousePosition, setMousePosition] = useState(initialMousePosition)
    const handleMouseMove = useCallback((event) => {
        const { clientX, clientY } = event;
        setMousePosition({ x: clientX, y: clientY });
    },[setMousePosition]);

  return (
    <svg width={width} height={height} onMouseMove={handleMouseMove}> 
        <circle r={radius} cx={mousePosition.x} cy={mousePosition.y} fill="#000" />
    </svg> 
  );
};

export default App
