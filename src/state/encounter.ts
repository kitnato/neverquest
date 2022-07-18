import { atom } from "jotai";
import { atomWithReset } from "jotai/utils";

import LOCRA from "@neverquest/locra";
import { crew, merchantInventoryGeneration } from "@neverquest/state/caravan";
import { nsfw } from "@neverquest/state/global";
import { monsterCreate } from "@neverquest/state/monster";
import { CrewHireStatus, LocationType } from "@neverquest/types/core";
import { UNKNOWN } from "@neverquest/utilities/constants";
import { CREW_MEMBERS, CREW_ORDER } from "@neverquest/utilities/constants-caravan";

// PRIMITIVES

export const level = atomWithReset(1);

export const mode = atomWithReset<LocationType>(LocationType.Wilderness);

export const progress = atomWithReset(0);

// READERS

export const isLevelCompleted = atom((get) => {
  const progressValue = get(progress);
  const progressMaxValue = get(progressMax);

  return progressValue === progressMaxValue;
});

export const isWilderness = atom((get) => {
  const modeValue = get(mode);

  return modeValue === LocationType.Wilderness;
});

export const progressMax = atom((get) => {
  const levelValue = get(level);

  return levelValue + 2;
});

// DERIVED

export const location = atom(
  (get) => {
    const isWildernessValue = get(isWilderness);
    const levelValue = get(level);
    const nsfwValue = get(nsfw);

    if (isWildernessValue) {
      if (levelValue === 1) {
        return UNKNOWN;
      }

      return LOCRA.generateLocation({
        isNSFW: nsfwValue,
        // TODO - affix probabilities
        hasPrefix: Math.random() < 0.8,
        hasSuffix: Math.random() < 0.1 * Math.ceil(levelValue / 2),
      });
    }

    return "Caravan";
  },
  (get, set) => {
    const isWildernessValue = get(isWilderness);

    if (isWildernessValue) {
      set(mode, LocationType.Caravan);
    } else {
      set(levelUp);
      set(mode, LocationType.Wilderness);
    }
  }
);

// WRITERS

export const levelUp = atom(null, (get, set) => {
  const crewValue = get(crew);
  const levelValue = get(level);
  const nextLevel = levelValue + 1;

  const newCrew = { ...crewValue };

  CREW_ORDER.forEach((type) => {
    const { hireStatus, monologueProgress } = crewValue[type];
    const { hirableLevel, monologues } = CREW_MEMBERS[type];

    // Progress the monologue for all hired crew members.
    if (hireStatus === CrewHireStatus.Hired && monologueProgress < monologues.length - 1) {
      newCrew[type].monologueProgress += 1;
    }

    // Make crew member hirable if the appropriate level has been reached.
    if (nextLevel >= hirableLevel && crewValue[type].hireStatus === CrewHireStatus.Unavailable) {
      newCrew[type].hireStatus = CrewHireStatus.Hirable;
    }
  });

  set(level, nextLevel);
  set(progress, 0);
  set(crew, newCrew);
  set(merchantInventoryGeneration);
  set(monsterCreate);
});
