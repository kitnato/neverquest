import { useEffect, useMemo } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { level, progress, progressMax } from "@neverquest/state/encounter";
import { skills } from "@neverquest/state/skills";
import { levelUp, resourcesBalance } from "@neverquest/state/transactions";
import { SkillStatus, SkillType } from "@neverquest/types/enums";

declare global {
  interface Window {
    cheatQuest: (state: string, value?: number) => void;
  }
}

export default function () {
  const levelValue = useRecoilValue(level);
  const progressMaxValue = useRecoilValue(progressMax);
  const setSkillArmor = useSetRecoilState(skills(SkillType.Armors));
  const setSkillBleed = useSetRecoilState(skills(SkillType.Bleed));
  const setSkillCriticals = useSetRecoilState(skills(SkillType.Criticals));
  const setSkillDodge = useSetRecoilState(skills(SkillType.Dodge));
  const setSkillParry = useSetRecoilState(skills(SkillType.Parry));
  const setSkillRegeneration = useSetRecoilState(skills(SkillType.Regeneration));
  const setSkillShields = useSetRecoilState(skills(SkillType.Shields));
  const setSkillStagger = useSetRecoilState(skills(SkillType.Stagger));
  const setLevelUp = useSetRecoilState(levelUp);
  const setProgress = useSetRecoilState(progress);
  const balanceResources = useSetRecoilState(resourcesBalance);

  const setSkill = useMemo(
    () => [
      setSkillArmor,
      setSkillBleed,
      setSkillCriticals,
      setSkillDodge,
      setSkillParry,
      setSkillRegeneration,
      setSkillShields,
      setSkillStagger,
    ],
    [
      setSkillArmor,
      setSkillBleed,
      setSkillCriticals,
      setSkillDodge,
      setSkillParry,
      setSkillRegeneration,
      setSkillShields,
      setSkillStagger,
    ]
  );

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
  }, [balanceResources, levelValue, progressMaxValue, setLevelUp, setProgress, setSkill]);

  return <></>;
}
