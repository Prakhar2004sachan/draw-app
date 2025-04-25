import { Line, Layer } from "react-konva";
import { canvasStore } from "@/app/store/canvasStore";

type Props = {
  stageWidth: number;
  stageHeight: number;
  scale: number;
  stageX: number;
  stageY: number;
};

const SnapGuideLines = ({ stageWidth, stageHeight,stageX, stageY,scale }: Props) => {
  const { snapLines } = canvasStore();

  const startX = -stageX / scale;
  const startY = -stageY / scale;
  const endX = startX + stageWidth / scale;
  const endY = startY + stageHeight / scale;


  return (
    <Layer listening={false}>
      {snapLines.x !== null && (
        <Line
          points={[snapLines.x, startY, snapLines.x, endY]}
          stroke="#33372C"
          strokeWidth={1}
          dash={[10, 5]}
        />
      )}
      {snapLines.y !== null && (
        <Line
          points={[startX, snapLines.y, endX, snapLines.y]}
          stroke="#33372C"
          strokeWidth={1}
          dash={[10, 5]}
        />
      )}
    </Layer>
  );
};

export default SnapGuideLines;
