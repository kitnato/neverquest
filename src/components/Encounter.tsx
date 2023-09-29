import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Caravan } from "@neverquest/components/Caravan";
import { Loot } from "@neverquest/components/Loot";
import { Wilderness } from "@neverquest/components/Wilderness";
import { isWilderness } from "@neverquest/state/encounter";

export function Encounter() {
  const isWildernessValue = useRecoilValue(isWilderness);

  return (
    <Stack gap={3}>
      {isWildernessValue ? (
        <>
          <Wilderness />

          <Loot />
        </>
      ) : (
        <Caravan />
      )}
    </Stack>
  );
}
