import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, extent, format } from 'd3'
import './App.css'
import { Dropdown } from './Dropdown'

const csvUrl = 'https://gist.githubusercontent.com/loniefink/e8a217b8acd62b259c380b2a9ed01305/raw/4cd2462336bfc82dc11e5e10e0b6537c7fe5ff9d/iris.csv';

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 56;
const yAxisLabelOffset = 45;
const xTickOffset = 7;
const yTickOffset = 10;
const circleRadius = 7;

/*
 *
 * App() 
 *
 */
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.sepal_length = +d.sepal_length;
      d.sepal_width = +d.sepal_width;
      d.petal_length = +d.petal_length;
      d.petal_width = +d.petal_width;
      d.species = d.species;
      return d;
    };
    csv(csvUrl, row).then(setData);
  }, []);
  

  if (!data) {
    return <pre>Loading...</pre>
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d.petal_length;
  const xAxisLabel = 'Petal Length';
  const yValue = d => d.sepal_width;
  const yAxisLabel = 'Sepal Width';

  const siFormat = format('.2s');
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace('G', 'B');

  const xScale = scaleLinear()
    .domain(extent(data,xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data,yValue))
    .range([0, innerHeight])

  //console.log(scaleLinear().ticks());


  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
    // AxisBottom(xScale, innerHeight, xAxisTickFormat);
      { xScale.ticks().map((tickValue, i) => {

        //console.log(tickValue);
        return (
          <g className="tick" key={i} transform={`translate(${xScale(tickValue)},0)`}>
           <line y2={innerHeight} />
          <text key={tickValue} style={{ textAnchor: 'middle' }} dy=".71em" y={innerHeight + yTickOffset}>
            {xAxisTickFormat(tickValue)}
          </text>
          </g>
        )})}

    // yAxisLabel
      <text
        className="axis-label"
        textAnchor="middle"
        transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
      >
      {yAxisLabel}
      </text>

    // AxisLeft
      { yScale.ticks().map(tickValue => {

        //console.log(tickValue);
        return (
        <g className="tick" key={tickValue} transform={`translate(0,${yScale(tickValue)})`}>
         <line x2={innerWidth} />
          <text
            key={tickValue}
            style={{ textAnchor: 'end' }}
            x={-xTickOffset}
            dy=".32em"
          >
            {tickValue}
          </text>
        </g>
      )})}

    // xAxisLabel
    <text
        className="axis-label"
        textAnchor="middle"
        x={innerWidth / 2}
        y={innerHeight + xAxisLabelOffset}
    >
      {xAxisLabel}
    </text>

    // Marks ( data, xScale, yScale, xValue, yValue, tooltipFormat ) 
      {
        /* */
        data.map(d => (
          <circle
            className="mark"
            cx={xScale(xValue(d))}
            cy={yScale(yValue(d))}
            r={circleRadius}
          >
            <title>{xAxisTickFormat(xValue(d))}</title>
          </circle>
        ))
      }

      </g>
    </svg>
  )
}

export default App
