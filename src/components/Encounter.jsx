import React from "react";
import { useRecoilValue } from "recoil";

import Caravan from "components/Caravan";
import Loot from "components/Loot";
import Wilderness from "components/Wilderness";
import { mode } from "state/atoms";

export default function Encounter() {
  const modeValue = useRecoilValue(mode);

  return (
    <>
      {modeValue === "wilderness" && (
        <>
          <Wilderness className="mb-3" />

          <Loot />
        </>
      )}

      {modeValue === "caravan" && <Caravan />}
    </>
  );
}
