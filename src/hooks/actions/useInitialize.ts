import ls from "localstorage-slim";
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from "recoil";

import { KEY_SESSION } from "@neverquest/constants";
import { ATTRIBUTES_INITIAL } from "@neverquest/constants/attributes";
import { CREW_INITIAL } from "@neverquest/constants/caravan";
import useCreateMonster from "@neverquest/hooks/actions/useCreateMonster";
import { attributes } from "@neverquest/state/attributes";
import { crew } from "@neverquest/state/caravan";
import { level, locations } from "@neverquest/state/encounter";
import { isNSFW } from "@neverquest/state/settings";
import { CrewStatus } from "@neverquest/types/enums";
import { generateLocation } from "@neverquest/utilities/generators";

export default function () {
  const createMonster = useCreateMonster();

  const levelValue = useRecoilValue(level);
  const isNSFWValue = useRecoilValue(isNSFW);
  const setLocations = useSetRecoilState(locations);

  return useRecoilCallback(({ set }) => () => {
    if (ls.get(KEY_SESSION) !== null) {
      return;
    }

    setLocations([generateLocation({ isNSFW: isNSFWValue, level: levelValue })]);
    createMonster();

    ATTRIBUTES_INITIAL.forEach((type) =>
      set(attributes(type), (current) => ({ ...current, isUnlocked: true }))
    );

    CREW_INITIAL.forEach((type) =>
      set(crew(type), (current) => ({
        ...current,
        hireStatus: CrewStatus.Hired,
      }))
    );
  });
}
