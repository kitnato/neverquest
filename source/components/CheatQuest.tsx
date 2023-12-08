import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { useAcquireSkill } from "@neverquest/hooks/actions/useAcquireSkill";
import { useGenerateMerchantInventory } from "@neverquest/hooks/actions/useGenerateMerchantInventory";
import { useIncreaseStage } from "@neverquest/hooks/actions/useIncreaseStage";
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness";
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { isAttacking } from "@neverquest/state/character";
import { location, progress, progressMaximum, stage } from "@neverquest/state/encounter";
import { isImmortal } from "@neverquest/state/reserves";
import { essenceLoot } from "@neverquest/state/resources";
import { SKILL_TYPES } from "@neverquest/types/unions";

declare const window: Window & {
  cheatQuest: (state: string, value?: number) => void;
};

export function CheatQuest() {
  const locationValue = useRecoilValue(location);
  const stageValue = useRecoilValue(stage);
  const progressMaximumValue = useRecoilValue(progressMaximum);

  const resetEssenceLoot = useResetRecoilState(essenceLoot);

  const setIsAttacking = useSetRecoilState(isAttacking);
  const setIsImmortal = useSetRecoilState(isImmortal);
  const setProgress = useSetRecoilState(progress);

  const acquireSkill = useAcquireSkill();
  const generateMerchantInventory = useGenerateMerchantInventory();
  const increaseStage = useIncreaseStage();
  const resetWilderness = useResetWilderness();
  const toggleLocation = useToggleLocation();
  const transactEssence = useTransactEssence();

  useEffect(() => {
    window.cheatQuest = (state, value) => {
      switch (state) {
        // Doom
        case "IDBEHOLDV": {
          setIsImmortal((isImmortal) => !isImmortal);

          break;
        }
        // Heretic
        case "gimmee": {
          if (typeof value === "string" && SKILL_TYPES.includes(value)) {
            acquireSkill(value);
          }

          break;
        }
        // Source engine
        case "noclip": {
          setProgress(progressMaximumValue);

          break;
        }
        // Starcraft
        case "something for nothing": {
          if (Number.isInteger(value) && value !== undefined) {
            transactEssence(value);
          }

          break;
        }
        // Thief
        case "starting_mission": {
          if (Number.isInteger(value) && value !== undefined && value > stageValue) {
            const difference = value - stageValue;

            for (let step = 0; step < difference; step++) {
              generateMerchantInventory();
              increaseStage();
            }

            resetWilderness();

            if (locationValue === "wilderness") {
              setIsAttacking(false);
              resetEssenceLoot();
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
    locationValue,
    stageValue,
    progressMaximumValue,
    resetEssenceLoot,
    resetWilderness,
    setProgress,
    toggleLocation,
    transactEssence,
    setIsAttacking,
    setIsImmortal,
  ]);

  return <></>;
}
