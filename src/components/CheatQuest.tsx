import { useEffect, useMemo } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { useGenerateMerchantInventory } from "@neverquest/hooks/actions/useGenerateMerchantInventory";
import { useIncreaseLevel } from "@neverquest/hooks/actions/useIncreaseLevel";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { isWilderness, level, progress, progressMaximum } from "@neverquest/state/encounter";
import { coinsLoot, essenceLoot, scrapLoot } from "@neverquest/state/resources";
import { skills } from "@neverquest/state/skills";
import { SkillType } from "@neverquest/types/enums";

declare const window: Window & {
  cheatQuest: (state: string, value?: number) => void;
};

export function CheatQuest() {
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
  const toggleLocation = useToggleLocation();
  const transactResources = useTransactResources();
  const resetWilderness = useResetWilderness();

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
          if (Number.isInteger(value)) {
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
          if (Number.isInteger(value) && value !== undefined && value in SkillType) {
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
          if (Number.isInteger(value)) {
            transactResources({ scrapDifference: value });
          }
          break;
        }
        // Starcraft
        case "something for nothing": {
          if (Number.isInteger(value)) {
            transactResources({ essenceDifference: value });
          }
          break;
        }
        // Thief
        case "starting_mission": {
          if (Number.isInteger(value) && value !== undefined && value > levelValue) {
            const difference = value - levelValue;

            for (let i = 0; i < difference; i++) {
              increaseLevel();
              generateMerchantInventory();
            }

            resetWilderness();

            if (isWildernessValue) {
              resetCoinsLoot();
              resetEssenceLoot();
              resetScrapLoot();
              toggleLocation();
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
    resetWilderness,
    setProgress,
    setSkill,
    toggleLocation,
    transactResources,
  ]);

  return null;
}
