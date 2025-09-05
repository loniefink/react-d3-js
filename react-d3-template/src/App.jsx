import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, scaleLinear, scaleOrdinal, extent, format } from 'd3'
import './App.css'
import Select from 'react-dropdown-select'

const csvUrl = 'https://gist.githubusercontent.com/loniefink/e8a217b8acd62b259c380b2a9ed01305/raw/4cd2462336bfc82dc11e5e10e0b6537c7fe5ff9d/iris.csv';

const width = 960;
const height = 500;
const margin = { top: 20, right: 150, bottom: 65, left: 90 };
const xAxisLabelOffset = 56;
const yAxisLabelOffset = 45;
const xTickOffset = 7;
const yTickOffset = 10;
const circleRadius = 7;
const initialXAttribute = 'sepal_length';
const initialYAttribute = 'sepal_width';
const attributes = [
    { value: 'sepal_length', label: 'Sepal Length'},
    { value: 'sepal_width', label: 'Sepal Width'},
    { value: 'petal_length', label: 'Petal Length'},
    { value: 'petal_width', label: 'Petal Width'},
    { value: 'species', label: 'Species'}
];
const colorLegendLabel = 'Species';


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

  const uniqueSpecies = [...new Set(data.map(d=> d.species))];

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

    // xValue returns petal_length
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);
  const colorValue = d => d.species;


  const siFormat = format('.2s');
  const xAxisTickFormat = (tickValue) => siFormat(tickValue).replace('G', 'B');

  const xScale = scaleLinear()
    .domain(extent(data,xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data,yValue))
    .range([0, innerHeight])

  const colorScale = scaleOrdinal()
    .domain(data.map(d=> d.species))
    .range(['#bb5f32', '#358013', '#681380']); //[] array of unique species
    /*
      console.log("colorScale.domain", colorScale.domain());
      console.log("colorScale.range", colorScale.range());
    */


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
                // ColorLegend 
              <g transform={`translate(${margin.left},${margin.top})`}>
                  <text
                    className="axis-label"
                    textAnchor="middle"
                    transform={`translate(${innerWidth+80},${30})`}
                  >{colorLegendLabel}</text>
                  <g className="legend" transform={`translate(${innerWidth+20},${60})`}>
                  {
                      colorScale.domain().map((domainValue,i) => {
                          return (
                              <g className="legend-item" transform={`translate(40,${i*30})`}>
                                <circle fill={colorScale(domainValue)} r={circleRadius} />
                                <text dx=".75em" dy=".32em">{domainValue}</text>
                              </g>
                          )
                      })
                  }
                  </g>
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
              { yScale.ticks().map((tickValue,i) => {

                //console.log(tickValue);
                return (
                <g className="tick" key={i} transform={`translate(0,${yScale(tickValue)})`}>
                 <line x2={innerWidth} />
                  <text
                    key={i}
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
                data.map((d,i) => (
                  <circle
                    key ={i}
                    className="mark"
                    fill={colorScale(colorValue(d))}
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
      </>
  )
}

export default App
