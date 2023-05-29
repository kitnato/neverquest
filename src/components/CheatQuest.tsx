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
import { Skill } from "@neverquest/types/enums";

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
  const setSkillArmorcraft = useSetRecoilState(skills(Skill.Armorcraft));
  const setSkillAnatomy = useSetRecoilState(skills(Skill.Anatomy));
  const setSkillAssassination = useSetRecoilState(skills(Skill.Assassination));
  const setSkillEvasion = useSetRecoilState(skills(Skill.Evasion));
  const setSkillEscrime = useSetRecoilState(skills(Skill.Escrime));
  const setSkillCalisthenics = useSetRecoilState(skills(Skill.Calisthenics));
  const setSkillShieldcraft = useSetRecoilState(skills(Skill.Shieldcraft));
  const setSkillTraumatology = useSetRecoilState(skills(Skill.Traumatology));

  const generateMerchantInventory = useGenerateMerchantInventory();
  const increaseLevel = useIncreaseLevel();
  const toggleLocation = useToggleLocation();
  const transactResources = useTransactResources();
  const resetWilderness = useResetWilderness();

  const setSkill = useMemo(
    () => [
      setSkillArmorcraft,
      setSkillAnatomy,
      setSkillAssassination,
      setSkillEvasion,
      setSkillEscrime,
      setSkillCalisthenics,
      setSkillShieldcraft,
      setSkillTraumatology,
    ],
    [
      setSkillArmorcraft,
      setSkillAnatomy,
      setSkillAssassination,
      setSkillEvasion,
      setSkillEscrime,
      setSkillCalisthenics,
      setSkillShieldcraft,
      setSkillTraumatology,
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
          if (Number.isInteger(value) && value !== undefined && value in Skill) {
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
          console.warn("Some doors are better left unopened ...");

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
