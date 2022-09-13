import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { level, progress, progressMax } from "@neverquest/state/encounter";
import { levelUp, resourcesBalance } from "@neverquest/state/transactions";
import { SkillStatus, SkillType } from "@neverquest/types/enums";
import { skills } from "@neverquest/state/skills";

declare global {
  interface Window {
    cheatQuest: (state: string, value?: number) => void;
  }
}

export default function () {
  const levelValue = useRecoilValue(level);
  const progressMaxValue = useRecoilValue(progressMax);
  const setLevelUp = useSetRecoilState(levelUp);
  const balanceResources = useSetRecoilState(resourcesBalance);
  const setSkill = [
    useSetRecoilState(skills(SkillType.Armors)),
    useSetRecoilState(skills(SkillType.Bleed)),
    useSetRecoilState(skills(SkillType.Criticals)),
    useSetRecoilState(skills(SkillType.Dodge)),
    useSetRecoilState(skills(SkillType.Parry)),
    useSetRecoilState(skills(SkillType.Regeneration)),
    useSetRecoilState(skills(SkillType.Shields)),
    useSetRecoilState(skills(SkillType.Stagger)),
  ];
  const setProgress = useSetRecoilState(progress);

  useEffect(() => {
    window.cheatQuest = (state, value) => {
      switch (state) {
        // Age of Empires
        case "COINAGE":
          if (typeof value === "number") {
            balanceResources({ coinsDifference: value });
          }
          break;
        // Doom
        case "IDBEHOLDV":
          // TODO - invulnerability
          break;
        // Heretic
        case "gimmee":
          if (typeof value === "number" && value in SkillType) {
            setSkill[value](SkillStatus.Trained);
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
          if (typeof value === "number" && value > levelValue) {
            const difference = value - levelValue;

            for (let i = 0; i < difference; i++) {
              setLevelUp(null);
            }
          }
          break;
        default:
          return;
      }
    };
  }, [levelValue, progressMaxValue]);

  return <></>;
}
