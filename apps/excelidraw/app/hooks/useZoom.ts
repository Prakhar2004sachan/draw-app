import { useEffect } from "react";
import { canvasStore } from "../store/canvasStore";

export function useZoom() {
  const { stageRef, zoomPercent, setZoomPercent, isPanning,setIsPanning } = canvasStore();
  // Minimum and Maximum zoom limits
  const MIN_ZOOM = 60;
  const MAX_ZOOM = 500;

  // Handle mouse wheel zooming
  const handleWheel = (e) => {
    e.evt.preventDefault();

    const stage = stageRef?.current;
    if (!stage) return;

    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();

    const mousePointTo = {
      x: (pointer.x - stage.x()) / oldScale,
      y: (pointer.y - stage.y()) / oldScale,
    };

    const direction = e.evt.deltaY > 0 ? 1 : -1;
    const scaleBy = 1.2;
    let newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    // Prevent zooming beyond the maximum or minimum zoom
    const newZoomPercent = Math.round(newScale * 100);
    if (newZoomPercent >= MAX_ZOOM) {
      newScale = MAX_ZOOM / 100; // Stop zooming in if we reach the max limit
    } else if (newZoomPercent <= MIN_ZOOM) {
      newScale = MIN_ZOOM / 100; // Stop zooming out if we reach the min limit
    }

    // Apply the new scale to the stage
    stage.scale({ x: newScale, y: newScale });

    const newPos = {
      x: pointer.x - mousePointTo.x * newScale,
      y: pointer.y - mousePointTo.y * newScale,
    };

    // Update zoomPercent only if within limits
    setZoomPercent(Math.round(newScale * 100));

    stage.position(newPos);
    stage.batchDraw(); // Optimize canvas rendering
  };

  // Update zoom level based on scale factor
  const updateZoom = (newScale: number) => {
    const stage = stageRef?.current;
    if (stage) {
      const oldScale = stage.scaleX();
      const pointer = stage.getPointerPosition();
      const mousePointTo = {
        x: (pointer.x - stage.x()) / oldScale,
        y: (pointer.y - stage.y()) / oldScale,
      };

      let newZoom = oldScale * newScale;

      // Ensure the zoom is within the limits
      if (newZoom * 100 < MIN_ZOOM) {
        newZoom = MIN_ZOOM / 100; // Prevent zooming out too much
      } else if (newZoom * 100 > MAX_ZOOM) {
        newZoom = MAX_ZOOM / 100; // Prevent zooming in too much
      }

      const newPos = {
        x: pointer.x - mousePointTo.x * newZoom,
        y: pointer.y - mousePointTo.y * newZoom,
      };

      stage.scale({ x: newZoom, y: newZoom });

      // Update zoomPercent only if it's within the limits
      setZoomPercent(Math.round(newZoom * 100));

      stage.position(newPos);
      stage.batchDraw(); // Re-render canvas
    }
  };

  // Zoom In (increase zoom)
  const zoomIn = () => {
    updateZoom(1.1); // Zoom in by 10%
  };

  // Zoom Out (decrease zoom)
  const zoomOut = () => {
    updateZoom(0.9); // Zoom out by 10%
  };

  // Reset zoom to 100%
  const resetZoom = () => {
    const stage = stageRef?.current;
    if (stage) {
      stage.scale({ x: 1, y: 1 });
      stage.position({ x: 0, y: 0 });
      setZoomPercent(100); // Reset to 100%
      stage.batchDraw(); // Re-render canvas after reset
    }
  };

  useEffect(()=>{
    const stage = stageRef?.current;
    if(!stage) return;

    const handleKeyDown = (e: KeyboardEvent)=>{
        if(e.code === "Space"){
            e.preventDefault();
            if(!isPanning){
                setIsPanning(true);
                stage.draggable(true);
                stage.container().style.current = "cursor ";
            }
        }
    }
    const handleKeyUp = (e: KeyboardEvent)=>{
        if(e.code === "Space"){
            setIsPanning(false);
            stage.draggable(false);
            stage.container().style.current = "default"
        }
    }
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
          window.removeEventListener("keydown", handleKeyDown);
          window.removeEventListener("keyup", handleKeyUp);
        };
  },[stageRef,isPanning])

  return { handleWheel, zoomPercent, zoomIn, zoomOut, resetZoom };
}
