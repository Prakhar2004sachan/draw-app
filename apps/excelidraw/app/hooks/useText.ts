import { useState } from "react";
import { canvasStore } from "../store/canvasStore";

export const useText =  ()=>{
      const {
        setShowInput,
        textInputRef,
        isPlaceholder,
        setIsPlaceholder,
        canvasRef,
        textPosition,
        setTextPosition,
      } = canvasStore();


     const handleCanvasClick = (e) => {
       const rect = canvasRef.current.getBoundingClientRect();
       const x = e.clientX - rect.left;
       const y = e.clientY - rect.top;
       setTextPosition( x, y);
       setShowInput(true);
       setIsPlaceholder(true);

       // Slight delay to ensure the element is mounted
       setTimeout(() => {
         if (textInputRef.current) {
           textInputRef.current.innerText = "Type something...";
           textInputRef.current.focus();
         }
       }, 0);
     };

     const handleFocus = () => {
       if (isPlaceholder && textInputRef.current) {
         textInputRef.current.innerText = "";
         setIsPlaceholder(false);
       }
     };

     const handleBlur = () => {
       const text = textInputRef.current?.innerText || "";
       const canvas = canvasRef.current;
       const ctx = canvas.getContext("2d");

       if (text.trim() !== "") {
         ctx.fillStyle = "black";
         ctx.font = "20px Arial";
         ctx.fillText(text.trim(), textPosition.x, textPosition.y);
       }

       setShowInput(false);
       setIsPlaceholder(true);
     };

     return {
        handleBlur,handleCanvasClick,handleFocus
     }
}