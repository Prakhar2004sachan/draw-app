import { Layer, Circle } from "react-konva";
import { useEffect, useState } from "react";

type Props = {
  width: number;
  height: number;
  scale: number;
  stageX: number;
  stageY: number;
};

const GridLayer = ({ width, height, scale,stageX, stageY }: Props) => {
  const [dots, setDots] = useState<{ x: number; y: number }[]>([]);

  useEffect(() => {
    const spacing = 50 / scale;
    const startX = -stageX / scale;
    const startY = -stageY / scale;
    const endX = startX + width / scale;
    const endY = startY + height / scale;
    const newDots: { x: number; y: number }[] = [];

    for (
      let x = Math.floor(startX / spacing) * spacing;
      x < endX;
      x += spacing
    ) {
      for (
        let y = Math.floor(startY / spacing) * spacing;
        y < endY;
        y += spacing
      ) {
        newDots.push({ x, y });
      }
    }

    setDots(newDots);

    setDots(newDots);
  }, [width, height, scale, stageX, stageY]);

  return (
    <Layer listening={false}>
      {dots.map((dot, i) => (
        <Circle
          key={i}
          x={dot.x}
          y={dot.y}
          radius={2}
          fill="black"
          opacity={0.3}
        />
      ))}
    </Layer>
  );
};

export default GridLayer;
