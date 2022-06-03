import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import Caravan from "neverquest/components/Caravan";
import Loot from "neverquest/components/Resource/Loot";
import Wilderness from "neverquest/components/Wilderness";
import { isWilderness } from "neverquest/state/encounter";

export default function Encounter() {
  const isWildernessValue = useAtomValue(isWilderness);

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
