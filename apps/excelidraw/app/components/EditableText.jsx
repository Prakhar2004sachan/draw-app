import React, { useRef, useState, useEffect, useCallback } from "react";
import { Stage, Layer, Text, Transformer } from "react-konva";
import { Html } from "react-konva-utils";

const TextEditor = ({ textNode, onClose, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!textareaRef.current || !textNode) return;

    const textarea = textareaRef.current;
    const stage = textNode.getStage();
    const textPosition = textNode.getAbsolutePosition();
    const stageBox = stage.container().getBoundingClientRect();
    const scale = textNode.getAbsoluteScale();

    // Apply styles to textarea
    textarea.value = textNode.text();
    textarea.style.position = "absolute";
    textarea.style.top = `${stageBox.top + textPosition.y}px`;
    textarea.style.left = `${stageBox.left + textPosition.x}px`;
    textarea.style.width = `${textNode.width() * scale.x}px`;
    textarea.style.height = `${textNode.height() * scale.y}px`;
    textarea.style.fontSize = `${textNode.fontSize() * scale.x}px`;
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.transformOrigin = "left top";
    textarea.style.transform = `scale(${scale.x}, ${scale.y})`;
    textarea.style.padding = "0px";
    textarea.style.margin = "0px";
    textarea.style.border = "none";
    textarea.style.background = "none";
    textarea.style.overflow = "hidden";
    textarea.style.outline = "none";
    textarea.style.resize = "none";
    textarea.style.color = textNode.fill();
    textarea.style.textAlign = textNode.align();
    textarea.style.webkitFontSmoothing = "antialiased";
    textarea.style.zIndex = 100;

    textarea.focus();

    const handleOutsideClick = (e) => {
      if (e.target !== textarea) {
        onChange(textarea.value);
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onChange(textarea.value);
        onClose();
      }
      if (e.key === "Escape") {
        onClose();
      }
    };

    const handleInput = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight + textNode.fontSize()}px`;
    };

    textarea.addEventListener("keydown", handleKeyDown);
    textarea.addEventListener("input", handleInput);
    setTimeout(() => window.addEventListener("click", handleOutsideClick));

    return () => {
      textarea.removeEventListener("keydown", handleKeyDown);
      textarea.removeEventListener("input", handleInput);
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [textNode, onClose, onChange]);

  return (
    <Html>
      <textarea ref={textareaRef} />
    </Html>
  );
};

const EditableText = () => {
  const [text, setText] = useState("Double click to edit me ✍️");
  const [isEditing, setIsEditing] = useState(false);
  const [textWidth, setTextWidth] = useState(300);

  const textRef = useRef();
  const trRef = useRef();

  useEffect(() => {
    if (trRef.current && textRef.current && !isEditing) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isEditing]);

  const handleTextDblClick = () => {
    setIsEditing(true);
  };

  const handleTextChange = (newText) => {
    setText(newText);
  };

  const handleTransform = () => {
    const node = textRef.current;
    const scaleX = node.scaleX();
    const newWidth = node.width() * scaleX;
    setTextWidth(newWidth);
    node.setAttrs({
      width: newWidth,
      scaleX: 1,
    });
  };

  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text
          ref={textRef}
          text={text}
          x={80}
          y={100}
          fontSize={24}
          fontFamily="Arial"
          fill="#000"
          width={textWidth}
          draggable
          onDblClick={handleTextDblClick}
          onDblTap={handleTextDblClick}
          onTransformEnd={handleTransform}
          visible={!isEditing}
        />
        {!isEditing && (
          <Transformer
            ref={trRef}
            enabledAnchors={["middle-left", "middle-right"]}
            boundBoxFunc={(oldBox, newBox) => {
              newBox.width = Math.max(30, newBox.width);
              return newBox;
            }}
          />
        )}
        {isEditing && textRef.current && (
          <TextEditor
            textNode={textRef.current}
            onChange={handleTextChange}
            onClose={() => setIsEditing(false)}
          />
        )}
      </Layer>
    </Stage>
  );
};

export default EditableText;
