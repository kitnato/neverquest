import { useAtomValue, useSetAtom } from "jotai";
import { level, progress, progressMax } from "neverquest/state/encounter";
import { resourcesBalance } from "neverquest/state/resources";
import { useEffect } from "react";

declare global {
  interface Window {
    cheatQuest: (state: string, value?: number) => void;
  }
}

export default function CheatQuest() {
  const progressMaxValue = useAtomValue(progressMax);

  const setLevel = useSetAtom(level);
  const balanceResources = useSetAtom(resourcesBalance);
  const setProgress = useSetAtom(progress);

  useEffect(() => {
    window.cheatQuest = (state, value) => {
      switch (state) {
        case "coinsDifference":
          if (typeof value === "number") {
            balanceResources({ coinsDifference: value });
          }
          break;
        case "completeLevel":
          setProgress(progressMaxValue);
          break;
        case "essenceDifference":
          if (typeof value === "number") {
            balanceResources({ essenceDifference: value });
          }
          break;
        case "level":
          if (typeof value === "number" && value && value >= 1) {
            setLevel(value);
          }
          break;
        case "scrapDifference":
          if (typeof value === "number") {
            balanceResources({ scrapDifference: value });
          }
          break;
        default:
          return;
      }
    };
  }, []);

  return <></>;
}
