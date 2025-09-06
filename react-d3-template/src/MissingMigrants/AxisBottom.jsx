export const AxisBottom = ({xScale, innerHeight, xAxisTickFormat, yTickOffset}) => {
    // AxisBottom(xScale, innerHeight, xAxisTickFormat);
    return ( xScale.ticks().map((tickValue, i) => (
      <g className="tick" key={i} transform={`translate(${xScale(tickValue)},0)`}>
      <line y2={innerHeight} />
      <text key={tickValue} style={{ textAnchor: 'middle' }} dy=".71em" y={innerHeight + yTickOffset}>
      {xAxisTickFormat(tickValue)}
      </text>
      </g>
    )))
}
