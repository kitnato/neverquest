import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Caravan } from "@neverquest/components/Caravan";
import { Wilderness } from "@neverquest/components/Encounter/Wilderness";
import { Loot } from "@neverquest/components/Loot";
import { isWilderness } from "@neverquest/state/encounter";

export function Encounter() {
  const isWildernessValue = useRecoilValue(isWilderness);

  if (isWildernessValue) {
    return (
      <Stack gap={3}>
        <Wilderness />

        <Loot />
      </Stack>
    );
  }

  return <Caravan />;
}
