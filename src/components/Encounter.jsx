import React from "react";
import { useRecoilValue } from "recoil";

import Caravan from "components/Caravan";
import Loot from "components/Loot";
import Travel from "components/Travel";
import Wilderness from "components/Wilderness";

import { mode } from "state/atoms";

export default function Encounter() {
  const modeValue = useRecoilValue(mode);

  return (
    <>
      {modeValue === "wilderness" && (
        <>
          <Wilderness />

          <div className="mt-3">
            <Loot />
          </div>
        </>
      )}

      {modeValue === "caravan" && <Caravan />}

      <div className="mt-3">
        <Travel />
      </div>
    </>
  );
}
