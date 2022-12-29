import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import Caravan from "@neverquest/components/Caravan";
import LootDisplay from "@neverquest/components/Resource/LootDisplay";
import Wilderness from "@neverquest/components/Wilderness";
import { isWilderness } from "@neverquest/state/encounter";

export default function () {
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
