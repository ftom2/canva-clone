import { useCallback, useRef, useState } from "react";
import { JSON_KEYS } from "../constants";

interface UseHistoryProps {
  canvas: fabric.Canvas | null;
}
export const useHistory = ({ canvas }: UseHistoryProps) => {
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const canvasHistory = useRef<string[]>([]);
  const skipSave = useRef<boolean>(false);

  const canUndo = useCallback(() => {
    return historyIndex > 0;
  }, [historyIndex]);

  const canRedo = useCallback(() => {
    return historyIndex < canvasHistory.current.length - 1;
  }, [historyIndex]);

  const save = useCallback(
    (skip = false) => {
      if (!canvas) return;
      const currentState = JSON.stringify(canvas.toJSON(JSON_KEYS));

      if (!skipSave.current && !skip) {
        canvasHistory.current.push(currentState);
        setHistoryIndex((prev) => prev + 1);
      }

      //TODO: Save callback
    },
    [canvas]
  );

  const undo = useCallback(() => {
    if (canUndo()) {
      skipSave.current = true;
      canvas?.clear().requestRenderAll();
      const prevIndex = historyIndex - 1;
      const prevState = JSON.parse(canvasHistory.current[prevIndex]);

      canvas?.loadFromJSON(prevState, () => {
        canvas?.renderAll();
        setHistoryIndex(prevIndex);
        skipSave.current = false;
      });
    }
  }, [canUndo, canvas, historyIndex]);

  const redo = useCallback(() => {
    if (canRedo()) {
      skipSave.current = true;
      canvas?.clear().requestRenderAll();
      const nextIndex = historyIndex + 1;
      const nextState = JSON.parse(canvasHistory.current[nextIndex]);

      canvas?.loadFromJSON(nextState, () => {
        canvas?.renderAll();
        setHistoryIndex(nextIndex);
        skipSave.current = false;
      });
    }
  }, [canRedo, canvas, historyIndex]);

  return { save, canUndo, canRedo, undo, redo, setHistoryIndex, canvasHistory };
};
