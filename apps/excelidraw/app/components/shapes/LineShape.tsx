import { Shape } from '@/app/utils/shapes/shapeTypes'
import React from 'react'
import { Line } from 'react-konva'

type Props = {
  shape : Shape
}

function LineShape({shape}: Props) {
  return (
    <Line
    id={shape.id}
    points={[
      shape.x,
      shape.y,
      shape.x + shape.width,
      shape.y + shape.height
    ]}
    stroke={"black"}
    strokeWidth={4}
    />
  )
}

export default LineShape