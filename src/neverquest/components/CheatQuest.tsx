import { useAtomValue, useSetAtom } from "jotai";
import { level, levelUp, progress, progressMax } from "neverquest/state/encounter";
import { resourcesBalance } from "neverquest/state/resources";
import { useEffect } from "react";

declare global {
  interface Window {
    cheatQuest: (state: string, value?: number) => void;
  }
}

export default function CheatQuest() {
  const levelValue = useAtomValue(level);
  const progressMaxValue = useAtomValue(progressMax);
  const setLevelUp = useSetAtom(levelUp);
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
          if (typeof value === "number" && value && value > levelValue) {
            const difference = value - levelValue;

            for (let i = 0; i < difference; i++) {
              setLevelUp();
            }
          }
          break;
        default:
          return;
      }
    };
  }, []);

  return <></>;
}
