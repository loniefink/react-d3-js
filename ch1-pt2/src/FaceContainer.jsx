export const FaceContainer = ({children, width, height, center_x, center_y}) => (
     <svg width={width} height={height}> 
      <g transform={`translate(${center_x}, ${center_y})`}>
        {children}
      </g>
     </svg> 
);

