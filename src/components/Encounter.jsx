import { useRecoilValue } from "recoil";

import Caravan from "components/Caravan";
import Loot from "components/Loot";
import Travel from "components/Travel";
import Wilderness from "components/Wilderness";

import { mode } from "state/global";

export default function Encounter() {
  const modeValue = useRecoilValue(mode);

  return (
    <div className="spaced">
      {modeValue === 0 && (
        <>
          <Wilderness />

          <Loot />
        </>
      )}

      {modeValue === 1 && <Caravan />}

      <Travel />
    </div>
  );
}
