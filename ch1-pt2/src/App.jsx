import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Face } from './Face.jsx'
import { range } from 'd3'

// svg canvas config
const canvas_width=100;
const canvas_height=100;

const width=canvas_width;
const height=canvas_height;
const radius_face=height*2/5;
const radius_eye=height*3/50;
const mouthRadius=height*4.55/20;
const mouthThickness=height*2.25/50;

const array = range(4*12);

const App = () => ( array.map((x,index) => {
  const [count, setCount] = useState(0)

  return (
    <>
      <Face
        key={index}
        width={width}
        height={height}
        radius_face={radius_face}
        radius_eye={radius_eye-2 + Math.random()*4}
        mouthRadius={mouthRadius + Math.random()*2}
        mouthThickness={mouthThickness-1 + Math.random()*3}
        eyeOffSetY={-(height*.15)-4 + Math.random()*8}
        eyeOffSetX={(height*.17)-1 + Math.random()*3}
        center_x={width/2} 
        center_y={height/2} 
      />
    </>

  )
}));

export default App
