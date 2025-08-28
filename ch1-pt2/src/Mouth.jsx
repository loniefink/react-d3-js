import { arc } from 'd3'

// switch to {} notion requires an explicit return
export const Mouth = (props) => {
      const mouthArc = arc()
          .innerRadius(props.radius)
          .outerRadius(props.radius+props.thickness)
          .startAngle(Math.PI /2)
          .endAngle(3*Math.PI/2);

      return <path d={mouthArc()} />
};

