import { useDrawShape } from '@/app/hooks/useDrawShape'
import { useShapes } from '@/app/hooks/useShapes'
import { Shape } from '@/app/utils/shapes/shapeTypes'
import React from 'react'
import { Line } from 'react-konva'

type Props = {
  shape : Shape
}

function LineShape({shape}: Props) {
  const { shapeRef,  isDraggable, handleSelect } = useShapes(
      shape.id
    );
         const {handleDragEnd} = useDrawShape();
    
  return (
    <Line
    ref={shapeRef}
    id={shape.id}
    points={[
      shape.x,
      shape.y,
      shape.x + shape.width,
      shape.y + shape.height
    ]}
    stroke={"black"}
    strokeWidth={shape.strokeWidth}
    opacity={shape.opacity}
    draggable={isDraggable}
    onClick={handleSelect}
    onDragEnd={handleDragEnd}
    />
  )
}

export default LineShape