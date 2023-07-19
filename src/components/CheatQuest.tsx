import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { useAcquireSkill } from "@neverquest/hooks/actions/useAcquireSkill";
import { useGenerateMerchantInventory } from "@neverquest/hooks/actions/useGenerateMerchantInventory";
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { isAttacking } from "@neverquest/state/character";
import { isWilderness, progress, progressMaximum, stage } from "@neverquest/state/encounter";
import { isImmortal } from "@neverquest/state/reserves";
import { coinsLoot, essenceLoot, scrapLoot } from "@neverquest/state/resources";
import { SKILL_TYPES } from "@neverquest/types/unions";

declare const window: Window & {
  cheatQuest: (state: string, value?: number) => void;
};

export function CheatQuest() {
  const isWildernessValue = useRecoilValue(isWilderness);
  const stageValue = useRecoilValue(stage);
  const progressMaximumValue = useRecoilValue(progressMaximum);

  const resetCoinsLoot = useResetRecoilState(coinsLoot);
  const resetEssenceLoot = useResetRecoilState(essenceLoot);
  const resetScrapLoot = useResetRecoilState(scrapLoot);

  const setIsAttacking = useSetRecoilState(isAttacking);
  const setIsImmortal = useSetRecoilState(isImmortal);
  const setProgress = useSetRecoilState(progress);

  const acquireSkill = useAcquireSkill();
  const generateMerchantInventory = useGenerateMerchantInventory();
  const increaseStage = useIncreaseStage();
  const resetWilderness = useResetWilderness();
  const toggleLocation = useToggleLocation();
  const transactResources = useTransactResources();

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
          setIsImmortal((current) => !current);

          break;
        }
        // Heretic
        case "gimmee": {
          if (typeof value === "string" && value in SKILL_TYPES) {
            acquireSkill(value);
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
          if (Number.isInteger(value) && value !== undefined && value > stageValue) {
            const difference = value - stageValue;

            for (let i = 0; i < difference; i++) {
              generateMerchantInventory();
              increaseStage();
            }

            resetWilderness();

            if (isWildernessValue) {
              setIsAttacking(false);
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
    acquireSkill,
    generateMerchantInventory,
    increaseStage,
    isWildernessValue,
    stageValue,
    progressMaximumValue,
    resetCoinsLoot,
    resetEssenceLoot,
    resetScrapLoot,
    resetWilderness,
    setProgress,
    toggleLocation,
    transactResources,
    setIsAttacking,
    setIsImmortal,
  ]);

  return null;
}
