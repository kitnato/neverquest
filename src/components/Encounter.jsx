import Stack from "react-bootstrap/Stack";

import { useRecoilValue } from "recoil";

import Caravan from "components/Caravan";
import Loot from "components/Loot";
import Travel from "components/Travel";
import Wilderness from "components/Wilderness";

import { isWilderness } from "state/global";

export default function Encounter() {
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

      <Travel />
    </Stack>
  );
}
