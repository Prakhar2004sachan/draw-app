import { useEffect, useRef, useState } from "react";
import { Text } from "react-konva";

const TextShape = ({ shape, onChange }) => {
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const textareaRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(shape.text);

  const [style, setStyle] = useState({
    display: "none",
    position: "absolute",
    top: 0,
    left: 0,
    fontSize: "20px",
    padding: "0px",
    margin: "0px",
    border: "1px solid lightgray",
    background: "white",
    outline: "none",
    resize: "none",
    overflow: "hidden",
    whiteSpace: "pre-wrap",
  });

  const handleDoubleClick = () => {
    const textNode = textRef.current;
    const stage = textNode.getStage();
    const stageBox = stage.container().getBoundingClientRect();
    const textPosition = textNode.getAbsolutePosition();

    setIsEditing(true);
    setValue(shape.text);

    const areaStyle = {
      ...style,
      display: "block",
      top: `${stageBox.top + textPosition.y}px`,
      left: `${stageBox.left + textPosition.x}px`,
      fontSize: `${textNode.fontSize()}px`,
      width: `${textNode.width()}px`,
      height: `${textNode.height()}px`,
    };

    setStyle(areaStyle);

    setTimeout(() => {
      textareaRef.current.focus();
      textareaRef.current.select();
    }, 0);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setStyle({ ...style, display: "none" });
    onChange({ ...shape, text: value });
  };

  const handleChange = (e) => {
    setValue(e.target.value);

    // Resize textarea dynamically
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.width = "auto";
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    textareaRef.current.style.width = textareaRef.current.scrollWidth + "px";
  };

  return (
    <>
      <Text
        ref={textRef}
        x={shape.x}
        y={shape.y}
        text={shape.text}
        fontSize={20}
        draggable
        opacity={shape.opacity}
        onDblClick={handleDoubleClick}
      />
      {isEditing && (
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          style={style}
        />
      )}
    </>
  );
};

export default TextShape;
