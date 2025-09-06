import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, max, scaleLog, scaleLinear, timeFormat, scaleTime, extent, format, timeMonths, histogram as bin, sum } from 'd3'
import './App.css'
import Select from 'react-dropdown-select'

//const csvUrl = 'https://gist.githubusercontent.com/loniefink/e8a217b8acd62b259c380b2a9ed01305/raw/4cd2462336bfc82dc11e5e10e0b6537c7fe5ff9d/iris.csv';
const csvUrl = 'https://gist.githubusercontent.com/loniefink/7855d4a2d1d1ca889cc83c9b5735236a/raw/71b2b91b6d2652e96ef939f1bded776e48e08f81/missing_migrants%2520-%2520Missing_Migrants_Global_Figures_allData.csv'

const width = 960;
const height = 500;
const margin = { top: 20, right: 30, bottom: 65, left: 90 };
const xAxisLabelOffset = 56;
const yAxisLabelOffset = 45;
const xTickOffset = 7;
const yTickOffset = 10;
const circleRadius = 2;
const initialXAttribute = 'date';
const initialYAttribute = 'dead';
const attributes = [
    { value: 'dead', label: 'Total Dead and Missing'},
    { value: 'date', label: 'Incident Date'},
    { value: 'coord', label: 'Coordinates'},
];


/*
 *
 * App() 
 *
 */
function App() {
  const [data, setData] = useState(null);
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const [yAttribute, setYAttribute] = useState(initialYAttribute);

  
  useEffect(() => {
    const row = (d) => {
        // date Incident Date	Total Number of Dead and Missing	Coordinates
      d.dead = +d['Total Number of Dead and Missing'];
      d.date = new Date(d['Incident Date']);
      d.coord = +d['Coordinates'];
      return d;
    };
    csv(csvUrl, row).then(setData);
  }, []);
  

  if (!data) {
    return <pre>Loading...</pre>
  }


    //console.log(data[0]);
  const getLabel = (value) => {
      for (let i=0; i< attributes.length; i++) {
          if (attributes[i].value === value) {
              //console.log(attributes[i].label);
              return attributes[i].label; 
          }
      }
      return attributes[0].label; 
  }

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xAxisTickFormat = timeFormat("%m-%Y")
    // xValue returns petal_length
    const xValue = d => d[xAttribute];
    const xAxisLabel = getLabel(xAttribute);
    const yValue = d => d[yAttribute];
    const yAxisLabel = getLabel(yAttribute);


  const xScale = scaleLinear()
    .domain(extent(data,xValue))
    .range([0, innerWidth])
    .nice();


  const [start, stop] = xScale.domain();

    /*
  const binnedData = bin()
        .value(xValue)
        .domain(xScale.domain())
        .thresholds(timeMonths(start, stop))(data);
  const aggData = binnedData
        .map(array => ({
            dead: sum(array,yValue),
            x0: array.x0,
            x1: array.x1
        }))
  console.log("aggData", aggData);
  console.log("binnedData", binnedData);
  */

  const yScale = scaleLog()
    .domain([1, max(data, d=> d.dead)])
    .range([innerHeight, 0])
    .nice();

    //console.log(yScale.domain())


    const options1 = [];
    const options2 = [];
    const options3 = [];
    const selectedValue = '';
  //console.log(scaleLinear().ticks());



  return (
      <>
      
          <div className="select-outer">
              <div className="select-inner">
                  <label>X:</label>
                  <Select
                      className="select-x"
                      options={attributes}
                      placeholder={getLabel(xAttribute)} // default
                      selectedValue={xAttribute}
                      onChange={([{value}]) => setXAttribute(value)}
                  />
                  <label className="label-y">Y:</label>
                      
                  <Select
                      className="select-y"
                      options={attributes}
                      placeholder={getLabel(yAttribute)} // default
                      selectedValue={yAttribute}
                      onChange={([{value}]) => setYAttribute(value)}
                  />
              </div>
          </div>
            <svg width={width} height={height}>
              <g transform={`translate(${margin.left},${margin.top})`}>
            // AxisBottom(xScale, innerHeight, xAxisTickFormat);
              { xScale.ticks().map((tickValue, i) => (
                  <g className="tick" key={i} transform={`translate(${xScale(tickValue)},0)`}>
                   <line y2={innerHeight} />
                  <text key={tickValue} style={{ textAnchor: 'middle' }} dy=".71em" y={innerHeight + yTickOffset}>
                    {xAxisTickFormat(tickValue)}
                  </text>
                  </g>
                ))}

            // yAxisLabel
              <text
                className="axis-label"
                textAnchor="middle"
                transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
              >
              {yAxisLabel}
              </text>

            // AxisLeft
          <g className="hide-every-few">
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
          </g>

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
                    cx={xScale(d.date)}
                    cy={yScale(d.dead)}
                    r={circleRadius}
                  >
                    <title>{xAxisTickFormat(d.dead)}</title>
                  </circle>
                ))
              }

              </g>
            </svg>
      </>
  )
}

export default App
