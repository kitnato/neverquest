import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Caravan } from "@neverquest/components/Caravan";
import { LootDisplay } from "@neverquest/components/Resources/LootDisplay";
import { Wilderness } from "@neverquest/components/Wilderness";
import { isWilderness } from "@neverquest/state/encounter";

export function Encounter() {
  const isWildernessValue = useRecoilValue(isWilderness);

  return (
    <Stack gap={3}>
      {isWildernessValue ? (
        <>
          <Wilderness />

          <LootDisplay />
        </>
      ) : (
        <Caravan />
      )}
    </Stack>
  );
}
