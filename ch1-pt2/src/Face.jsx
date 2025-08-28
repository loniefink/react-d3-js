import { FaceContainer } from './FaceContainer.jsx'
import { Head } from './Head.jsx'
import { Eyes } from './Eyes.jsx'
import { Mouth } from './Mouth.jsx'

export const Face = ({key, width, height, radius_face, radius_eye, mouthRadius, mouthThickness, eyeOffSetY, eyeOffSetX, center_x, center_y}) => (
    <>
      <FaceContainer
        width={width}
        height={height}
        center_x={center_x}
        center_y={center_y}
      >
        // Face
        <Head
          key="head-{key}"
          radius={radius_face} 
        />
        // Eyes
        <Eyes
          key="eyes-{key}"
          radius={radius_eye}
          cx={eyeOffSetX}
          cy={eyeOffSetY} />
        // Mouth
        <Mouth
          key="mouth-{key}"
          radius={mouthRadius}
          thickness={mouthThickness}
        />
      </FaceContainer>
    </>
);

