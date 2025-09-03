import React, { useState, useCallback, useEffect } from 'react'
import ReactDom from 'react-dom'
import { arc, csv } from 'd3'
import './App.css'

// from ../ch1-pt2/src/Mouth.js

// svg canvas config
const width=960;
const height=500;
const center_x=(width/2);
const center_y=(height/2); 
/*
const radius=20;
const initialMousePosition = { x: center_x, y: center_y };
*/

// cvs data config
const urlCSV = 'https://gist.githubusercontent.com/loniefink/df895e8eaccb46e8fb060cac99e53787/raw/c64eea6fe44fbd3d4de0fc23c3fb9871d5c587a9/cssNamedColors.csv'

const pieArc = arc()
        .innerRadius(0)
        .outerRadius(width);

const App = () => {
    // const[ mousePosition: variable we are updating, 
    //        setMousePosition: variable we use to set first variable
    //  useState(initialMousePosition: variable definition for initial state ie. null etc)
    const [data, setData] = useState(null)
    /*
     * useEffect is used here to prevent repeated calls on every loop to host
     */
    useEffect(() => {
        d3.csv(urlCSV).then(data => {
            setData(data)
        });
    }, []); // empty array implies single firing of function

    if (!data) {
        return <div className="bold">'Loading...'</div>
    }

    console.log(data[0]);
    //console.log(data.map(d=>d));
    //console.log(data.length);
    //let i=0;   

    return <svg width={width} height={height}>
            <g transform={`translate(${center_x}, ${center_y})`}>
                {data.map((d, i) => (
                        <path key={i} fill={d['RGB hex value']} d={pieArc({
                            startAngle: (i / data.length * 2 * Math.PI),
                            endAngle: ((i+1) / data.length * 2 * Math.PI)
                        })} />
                ))}
                /*
                */
            </g>
        </svg> 
};

export default App
