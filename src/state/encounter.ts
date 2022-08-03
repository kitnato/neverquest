import { atom, selector } from "recoil";

import { UNKNOWN } from "@neverquest/constants";
import { CREW_MEMBERS, CREW_ORDER } from "@neverquest/constants/caravan";
import LOCRA from "@neverquest/locra";
import { crew, merchantInventoryGeneration } from "@neverquest/state/caravan";
import { localStorageEffect } from "@neverquest/state/effects";
import { isNSFW } from "@neverquest/state/global";
import { isShowing } from "@neverquest/state/isShowing";
import { monsterCreate } from "@neverquest/state/monster";
import { CrewStatus, LocationType, ShowingType, StorageKey } from "@neverquest/types/enums";

// ATOMS

export const level = atom({
  default: 1,
  effects: [localStorageEffect<number>(StorageKey.Level)],
  key: StorageKey.Level,
});

export const mode = atom({
  default: LocationType.Wilderness,
  effects: [localStorageEffect<LocationType>(StorageKey.Mode)],
  key: StorageKey.Mode,
});

export const progress = atom({
  default: 0,
  effects: [localStorageEffect<number>(StorageKey.Progress)],
  key: StorageKey.Progress,
});

// SELECTORS

export const isLevelCompleted = selector({
  key: "isLevelCompleted",
  get: ({ get }) => get(progress) === get(progressMax),
});

export const isWilderness = selector({
  key: "isWilderness",
  get: ({ get }) => get(mode) === LocationType.Wilderness,
});

export const progressMax = selector({
  key: "progressMax",
  get: ({ get }) => get(level) + 2,
});

export const location = selector({
  key: "location",
  get: ({ get }) => {
    const isWildernessValue = get(isWilderness);
    const levelValue = get(level);
    const nsfwValue = get(isNSFW);

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
  set: ({ get, set }) => {
    const isWildernessValue = get(isWilderness);

    if (isWildernessValue) {
      set(mode, LocationType.Caravan);
    } else {
      set(levelUp, null);
      set(mode, LocationType.Wilderness);
    }
  },
});

// TODO: refactor as useRecoilTransaction(), as soon as it can handle selectors too

export const levelUp = selector({
  get: () => null,
  key: "levelUp",
  set: ({ get, set }) => {
    const levelValue = get(level);
    const nextLevel = levelValue + 1;

    CREW_ORDER.forEach((type) => {
      const { hireStatus, monologueProgress } = get(crew(type));
      const isShowingCrewHiring = isShowing(ShowingType.CrewHiring);

      const { hirableLevel, monologues } = CREW_MEMBERS[type];

      // Progress the monologue for all hired crew members.
      if (hireStatus === CrewStatus.Hired && monologueProgress < monologues.length - 1) {
        set(crew(type), (current) => ({
          ...current,
          monologueProgress: current.monologueProgress + 1,
        }));
      }

      // Make crew member hirable if the appropriate level has been reached.
      if (hireStatus === CrewStatus.Unavailable && nextLevel >= hirableLevel) {
        set(crew(type), (current) => ({
          ...current,
          hireStatus: CrewStatus.Hirable,
        }));

        if (!get(isShowingCrewHiring)) {
          set(isShowingCrewHiring, true);
        }
      }
    });

    set(level, nextLevel);
    set(progress, 0);
    set(merchantInventoryGeneration, null);
    set(monsterCreate, null);
  },
});
