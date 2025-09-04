import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, scaleTime, extent, timeFormat, line, curveNatural } from 'd3'
import './App.css'

const csvUrl = 'https://gist.githubusercontent.com/loniefink/2ff9dd5a1e96e492f5ecd18dc7293f00/raw/2dd52c6ceebc5f2dee6c25824a21d0e472902e55/week_temperature_sf.csv';

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 56;
const yAxisLabelOffset = 45;
const xTickOffset = 7;
const yTickOffset = 10;
const circleRadius = 3;

/*
 *
 * App() 
 *
 */
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const row = (d) => {
      d.timestamp = new Date(d.timestamp);
      d.temperature = +d.temperature;
      return d;
    };
    csv(csvUrl, row).then(setData);
  }, []);
  

  if (!data) {
    return <pre>Loading...</pre>
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = d => d.timestamp;
  const xAxisLabel = 'Time';
  const yValue = d => d.temperature;
  const yAxisLabel = 'Temperature';

  const xAxisTickFormat = timeFormat("%a");

  const xScale = scaleTime()
    .domain(extent(data,xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data,yValue))
    .range([innerHeight, 0])
    .nice();

  console.log(data);


  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
    // AxisBottom(xScale, innerHeight, xAxisTickFormat);
      { xScale.ticks().map(tickValue => {

        //console.log(tickValue);
        return (
          <g className="tick" key={tickValue} transform={`translate(${xScale(tickValue)},0)`}>
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
      // Line
        <g className="marks">
          <path 
            d={line().x((d) => xScale(xValue(d))).y((d) => yScale(yValue(d))).curve(curveNatural)(data)}
          />
        {
      // circles
            data.map(d => (
              <circle
                //className="mark"
                cx={xScale(xValue(d))}
                cy={yScale(yValue(d))}
                r={circleRadius}
              >
                <title>{xAxisTickFormat(xValue(d))}</title>
              </circle>
            ))
        }
        </g>

      </g>
    </svg>
  )
}

export default App
