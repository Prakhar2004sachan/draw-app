export const getTransformedPointer = (stage: any) => {
  const transform = stage?.getAbsoluteTransform().copy().invert();
  const pos = stage?.getPointerPosition();
  return pos ? transform.point(pos) : null;
};

export const setCursor = (cursor: string, stage: any) => {
  if (!stage) return;
  stage.container().style.cursor = cursor;
};
