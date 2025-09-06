import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { max, json, scaleSqrt, geoPath, geoNaturalEarth1, geoGraticule  } from 'd3'
import { feature, mesh } from 'topojson-client';
import { useWorldAtlas } from './useWorldAtlas'
import { useData } from './useData'
import { Marks } from './Marks'
import './App.css'

const width = 960;
const height = 500;
// used in circle fill w/ colors[r-1]
const colors = [ '#000', '#444', '#666', '#777', '#888' ];
let maxPopulation = 0;
let minPopulation = 0;
const maxRadius = 10;
const getR = (thisPopulation) => {
    let r = 0;
    if ((maxPopulation - minPopulation) !== 0) {
      r = 4*((thisPopulation - minPopulation)/(maxPopulation - minPopulation));
    }
    return Math.floor(r+1);
}
/*
 *
 * App() 
 *
 */
function App() {
  // Data
  const dataWorld = useWorldAtlas();
  const dataMAD = useData();

  // topojson data requires transformation to geojson for easier presentation w/ d3

  if (!dataWorld || !dataMAD) {
    return <pre>Loading...</pre>
  }

  /*
  console.log(dataMAD[0]);
  maxPopulation = data[0].population;
  minPopulation = data[(data.length-1)].population;
  */

    const sizeValue = (d) => d.dead;
    const sizeScale = scaleSqrt()
        .domain([0,max(dataMAD, sizeValue)])
        .range([0, maxRadius]);



  return (
    <svg width={width} height={height}>
      <Marks dataMAD={dataMAD}  dataWorld={dataWorld} sizeScale={sizeScale} sizeValue={sizeValue} getR={getR} />
    </svg>
  )
}

export default App
