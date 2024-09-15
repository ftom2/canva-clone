import { useEffect } from "react";
import { ICanvas } from "../types";

interface UseCanvasEventsProps extends ICanvas {
  setSelectedObjects: (objects: fabric.Object[]) => void;
  save: () => void;
}

export default function useCanvasEvents({
  save,
  canvas,
  container,
  setSelectedObjects,
}: UseCanvasEventsProps) {
  useEffect(() => {
    if (canvas) {
      canvas.on("object:added", () => save());
      canvas.on("object:removed", () => save());
      canvas.on("object:modified", () => save());
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
        canvas.off("object:added");
        canvas.off("object:removed");
        canvas.off("object:modified");
        canvas.off("selection:created");
        canvas.off("selection:updated");
        canvas.off("selection:cleared");
      }
    };
  }, [canvas, save, setSelectedObjects]);
}
