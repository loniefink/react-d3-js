export const AxisLeft = ({yScale, innerWidth, xTickOffset}) => (
    yScale.ticks().map((tickValue, i) => {
      return (
        <g
        className="tick"
        key={i}
        transform={`translate(0,${yScale(tickValue)})`}
        >
        <line x2={innerWidth} />
        <text
        style={{ textAnchor: 'end' }}
        x={-xTickOffset}
        dy=".32em"
        >
        {tickValue}
        </text>
        </g>
    )})
)

