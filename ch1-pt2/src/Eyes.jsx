//export const Eyes = ({radius, cx, cy}) => ( 
export const Eyes = (props) => ( 
  <>
        <circle r={props.radius} cx={-props.cx} cy={props.cy} />
        <circle r={props.radius} cx={props.cx} cy={props.cy} />
  </>
);

