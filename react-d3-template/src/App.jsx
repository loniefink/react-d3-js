import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { max, json, scaleSqrt, geoPath, geoNaturalEarth1, geoGraticule  } from 'd3'
import { feature, mesh } from 'topojson-client';
import { useWorldAtlas } from './Data/useWorldAtlas'
import { useData } from './Data/useData'
import { WorldMap } from './WorldMap/WorldMap'
import { DateHistogram } from './MissingMigrants/DateHistogram'
import './App.css'

const width = 960;
const height = 600;
// used in circle fill w/ colors[r-1]
const colors = [ '#000', '#444', '#666', '#777', '#888' ];
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



  return (
    <svg width={width} height={height}>
        <g className="marks">
            //WorldMap calls MissingAndDead data
            <WorldMap dataWorld={dataWorld} dataMAD={dataMAD} />
            <DateHistogram height={height} width={width} dataMAD={dataMAD} />
        </g>
    </svg>
  )
}

export default App
