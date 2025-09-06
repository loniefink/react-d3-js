import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { csv, max, scaleLog, scaleLinear, timeFormat, scaleTime, extent, format, timeMonths, histogram as bin, sum } from 'd3'
import Select from 'react-dropdown-select'


const initialXAttribute = 'date';
const initialYAttribute = 'dead';

export const DateHistogram = ({dataMAD, height, width}) => {
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const [yAttribute, setYAttribute] = useState(initialYAttribute);

  const margin = { top: 400, right: 30, bottom: 65, left: 90 };
  const xAxisLabelOffset = 56;
  const yAxisLabelOffset = 45;
  const xTickOffset = 7;
  const yTickOffset = 10;
  const circleRadius = 2;
  const attributes = [
    { value: 'dead', label: 'Total Dead and Missing'},
    { value: 'date', label: 'Incident Date'},
    { value: 'coord', label: 'Coordinates'},
  ];


  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  // xValue returns petal_length
  const xValue = d => d[xAttribute];
  const yValue = d => d[yAttribute];

  const xAxisTickFormat = timeFormat("%m-%Y")

  const xScale = scaleTime()
    .domain(extent(dataMAD,xValue))
    .range([0, innerWidth])
    .nice();


  const [start, stop] = xScale.domain();

  const binnedData = bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(dataMAD);
  const aggData = binnedData
    .map(array => ({
      totalDeadAndMissing: sum(array,yValue),
      x0: array.x0,
      x1: array.x1
    }))
  //console.log("aggData", aggData);
  //console.log("binnedData", binnedData);

  const yScale = scaleLinear()
    .domain([0, max(aggData, d=> d.totalDeadAndMissing)])
    .range([innerHeight, 0])

  console.log(yScale.domain())


  const options1 = [];
  const options2 = [];
  const options3 = [];
  const selectedValue = '';
  //console.log(scaleLinear().ticks());
  //console.log("DateHistogram Called");

  return (
    <>
    <rect  transform={`translate(0,${margin.top})`} fill="#FFF" height={innerHeight} width={width} />
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

    // Marks ( data, xScale, yScale, xValue, yValue, tooltipFormat ) 
    {
      /* */
      aggData.map(d => (
        <rect
        className="mark"
        x={xScale(d.x0)}
        y={yScale(d.totalDeadAndMissing)}
        width={xScale(d.x1) - xScale(d.x0)}
        height={innerHeight - yScale(d.totalDeadAndMissing)}
        >
        <title>{xAxisTickFormat(d.totalDeadAndMissing)}</title>
        </rect>
      ))
    }

    </g>
    </>
  )
}
