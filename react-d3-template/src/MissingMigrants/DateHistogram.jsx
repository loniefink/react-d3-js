import { useRef, useEffect, useMemo } from 'react';
import { max, scaleLinear, timeFormat, scaleTime, extent, timeMonths, histogram as bin, sum, brushX, select, event } from 'd3'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'

const initialXAttribute = 'date';
const initialYAttribute = 'dead';
const xAxisTickFormat = timeFormat("%m-%Y")
// placeholders for useState functions that were rm
const xAttribute = initialXAttribute;
const yAttribute = initialYAttribute;
// xValue returns date
const xValue = d => d[xAttribute];
const yValue = d => d[yAttribute];
// window settings
const margin = { top: 400, right: 30, bottom: 65, left: 90 };
const xTickOffset = 7;
const yTickOffset = 10;



export const DateHistogram = ({data, height, width, setBrushExtent}) => {
  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xScale = useMemo(() => scaleTime()
    .domain(extent(data,xValue))
    .range([0, innerWidth])
    .nice(), [data, innerWidth, xValue]);
  // xScale defined below, uses aggData (ie. aggregate data)

  const binnedData = useMemo(() => {
    const [start, stop] = xScale.domain();
    return bin()
    .value(xValue)
    .domain(xScale.domain())
    .thresholds(timeMonths(start, stop))(data)}, [data, xValue, xScale, yValue])
  const aggData = useMemo(() => { 
    return binnedData 
    .map(array => ({
      totalDeadAndMissing: sum(array,yValue),
      x0: array.x0,
      x1: array.x1
    }))},[binnedData, yValue]);

  const yScale = useMemo(() => {
    console.log('yScale');
    return scaleLinear()
    .domain([0, max(aggData, d=> d.totalDeadAndMissing)])
    .range([innerHeight, 0])}, [aggData, innerHeight] );

  //console.log("[[0,0],[",width-margin.right, innerHeight,"]]");

  // brushRef is used for selection on histogram via the ref=brushRef on the g tag below
  const brushRef = useRef();

  useEffect(() => {
    const brush = brushX()
      .extent([[0,0],[innerWidth, innerHeight]]);
      brush(select(brushRef.current));
      brush.on('brush end', () => {
        setBrushExtent(event.selection && event.selection.map(xScale.invert));
      });
  }, [innerWidth, innerHeight]);
  return (
    <>
    <rect  transform={`translate(0,${margin.top})`} fill="#FFF" height={innerHeight} width={width} />
    <g transform={`translate(${margin.left},${margin.top})`}>

    <AxisBottom xScale={xScale} innerHeight={innerHeight} xAxisTickFormat={xAxisTickFormat} yTickOffset={yTickOffset} />
    <AxisLeft yScale={yScale} innerWidth={innerWidth} xTickOffset={xTickOffset} />
    // Marks ( data, xScale, yScale, xValue, yValue, tooltipFormat ) 
    {
      aggData.map((d, i) => (
        <rect
        key={i}
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

    <g ref={brushRef} />
    </g>
    </>
  )
}
