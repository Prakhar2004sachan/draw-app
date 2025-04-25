export const SNAP_THRESHOLD = 10;

export const snapToGrid = (value: number, spacing: number) => {
  return Math.round(value / spacing) * spacing;
};

export const getSnapOffset = (pos: number, otherPositions: number[]) => {
  for (let point of otherPositions) {
    if (Math.abs(pos - point) < SNAP_THRESHOLD) {
      return point;
    }
  }
  return pos;
};
