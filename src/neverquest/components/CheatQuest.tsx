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
        // Age of Empires
        case "COINAGE":
          if (typeof value === "number") {
            balanceResources({ coinsDifference: value });
          }
          break;
        // Source engine
        case "noclip":
          setProgress(progressMaxValue);
          break;
        // The Sims
        case "rosebud":
          if (typeof value === "number") {
            balanceResources({ scrapDifference: value });
          }
          break;
        // Starcraft
        case "something for nothing":
          if (typeof value === "number") {
            balanceResources({ essenceDifference: value });
          }
          break;
        // Thief
        case "starting_mission":
          if (typeof value === "number" && value && value >= 1) {
            setLevel(value);
          }
          break;
        default:
          return;
      }
    };
  }, []);

  return <></>;
}
