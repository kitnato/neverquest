import { useEffect, useMemo } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import useGenerateMerchantInventory from "@neverquest/hooks/actions/useGenerateMerchantInventory";
import useIncreaseLevel from "@neverquest/hooks/actions/useIncreaseLevel";
import useSwitchLocation from "@neverquest/hooks/actions/useSwitchLocation";
import useTransactResources from "@neverquest/hooks/actions/useTransactResources";
import { isWilderness, level, progress, progressMaximum } from "@neverquest/state/encounter";
import { coinsLoot, essenceLoot, scrapLoot } from "@neverquest/state/resources";
import { skills } from "@neverquest/state/skills";
import { SkillType } from "@neverquest/types/enums";

declare global {
  interface Window {
    cheatQuest: (state: string, value?: number) => void;
  }
}

export default function () {
  const isWildernessValue = useRecoilValue(isWilderness);
  const levelValue = useRecoilValue(level);
  const progressMaximumValue = useRecoilValue(progressMaximum);

  const resetCoinsLoot = useResetRecoilState(coinsLoot);
  const resetEssenceLoot = useResetRecoilState(essenceLoot);
  const resetScrapLoot = useResetRecoilState(scrapLoot);
  const setProgress = useSetRecoilState(progress);
  const setSkillArmor = useSetRecoilState(skills(SkillType.Armors));
  const setSkillBleed = useSetRecoilState(skills(SkillType.Bleed));
  const setSkillCriticals = useSetRecoilState(skills(SkillType.Criticals));
  const setSkillDodge = useSetRecoilState(skills(SkillType.Dodge));
  const setSkillParry = useSetRecoilState(skills(SkillType.Parry));
  const setSkillRegeneration = useSetRecoilState(skills(SkillType.Regeneration));
  const setSkillShields = useSetRecoilState(skills(SkillType.Shields));
  const setSkillStagger = useSetRecoilState(skills(SkillType.Stagger));

  const generateMerchantInventory = useGenerateMerchantInventory();
  const increaseLevel = useIncreaseLevel();
  const switchLocation = useSwitchLocation();
  const transactResources = useTransactResources();

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
        case "COINAGE": {
          if (typeof value === "number") {
            transactResources({ coinsDifference: value });
          }
          break;
        }
        // Doom
        case "IDBEHOLDV": {
          // TODO - invulnerability
          break;
        }
        // Heretic
        case "gimmee": {
          if (typeof value === "number" && value in SkillType) {
            setSkill[value](true);
          }
          break;
        }
        // Source engine
        case "noclip": {
          setProgress(progressMaximumValue);
          break;
        }
        // The Sims
        case "rosebud": {
          if (typeof value === "number") {
            transactResources({ scrapDifference: value });
          }
          break;
        }
        // Starcraft
        case "something for nothing": {
          if (typeof value === "number") {
            transactResources({ essenceDifference: value });
          }
          break;
        }
        // Thief
        case "starting_mission": {
          if (typeof value === "number" && value > levelValue) {
            const difference = value - levelValue;

            for (let i = 0; i < difference; i++) {
              increaseLevel();
              generateMerchantInventory();
              setProgress(-1);
            }

            if (isWildernessValue) {
              resetCoinsLoot();
              resetEssenceLoot();
              resetScrapLoot();
              switchLocation();
            }
          }
          break;
        }
        default: {
          return;
        }
      }
    };
  }, [
    generateMerchantInventory,
    increaseLevel,
    isWildernessValue,
    levelValue,
    progressMaximumValue,
    resetCoinsLoot,
    resetEssenceLoot,
    resetScrapLoot,
    setProgress,
    setSkill,
    switchLocation,
    transactResources,
  ]);

  return null;
}
