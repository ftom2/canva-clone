import { useEvent } from "react-use";

export function useWindowEvents() {
  useEvent("beforeunload", (e) => {
    e.returnValue = "Are you sure you want to leave?";
  });
}
