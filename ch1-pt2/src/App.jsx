import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { arc } from 'd3'

// svg
const width=980;
const height=500;
// face
const radius_face=200;
const radius_eye=30;
let eyeOffSetY = (height * .2);
let eyeOffSetX = (width * .08);
let center_x = width/2; 
let center_y = height/2; 
let center_y_sm = -eyeOffSetY; 
let center_x_sm_left = -eyeOffSetX; 
let center_x_sm_right = +eyeOffSetX; 
// mouth
let mouthRadius = 120;
let mouthThickness = 20;
const mouthArc = arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius+mouthThickness)
    .startAngle(Math.PI /2)
    .endAngle(3*Math.PI/2);

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <svg width={width} height={height}> 
      <g transform={`translate(${center_x}, ${center_y})`}>
        <circle r={radius_face} fill="yellow" stroke="#000" stroke-width="7" />
        <circle r={radius_eye} cx={center_x_sm_left} cy={center_y_sm} />
        <circle r={radius_eye} cx={center_x_sm_right} cy={center_y_sm} />
        <path d={mouthArc()} />
      </g>
     </svg> 
    </>
  )
}

export default App
