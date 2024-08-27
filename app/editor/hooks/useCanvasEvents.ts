import { useEffect } from "react";
import { ICanvas } from "../types";

interface UseCanvasEventsProps extends ICanvas {
  setSelectedObjects: (objects: fabric.Object[]) => void;
}

export default function useCanvasEvents({
  canvas,
  container,
  setSelectedObjects,
}: UseCanvasEventsProps) {
  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:updated", (e) => {
        setSelectedObjects(e.selected || []);
      });
      canvas.on("selection:cleared", () => {
        setSelectedObjects([]);
      });
    }

    return () => {
      if (canvas) {
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas]);
}
