import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
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
 * functions() 
 *
 */
/*
 *
 * App() 
 *
 */
function App() {
  // Data Requested
  const dataWorld = useWorldAtlas();
  const dataMAD = useData();
  const [brushExtent, setBrushExtent] = useState(null);

  if (!dataWorld || !dataMAD) {
    return <pre>Loading...</pre>
  }
  // Data Acquired
  
  // limit presentation data to selection
  const filteredDataMAD = brushExtent ? dataMAD.filter(d => {
      return ((brushExtent[0] < d.date) && (d.date < brushExtent[1]))
  }) : dataMAD;

  return (
    <svg width={width} height={height}>
        <g className="marks">
            //WorldMap calls MissingAndDead data
            <WorldMap dataWorld={dataWorld} dataMAD={dataMAD} dataFiltered={filteredDataMAD}/>
            <DateHistogram height={height} width={width} data={dataMAD} setBrushExtent={setBrushExtent} />
        </g>
    </svg>
  )
}

export default App
