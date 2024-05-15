import {
  EdgeProps,
} from "reactflow";

const CustomEdge: React.FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  style = {},
}) => {
  const controlPointX = (sourceX + targetX) / 2;
  const controlPointY = (sourceY + targetY) / 2;

  return (
    <>
      <path
        id={id}
        style={{
          strokeWidth: 3,
          stroke: "yellow",
          ...style,
        }}
        d={`M${sourceX},${sourceY}Q${controlPointX},${controlPointY} ${targetX},${targetY}`}
      />
    </>
  );
};

export default CustomEdge;