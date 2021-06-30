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

          <Loot />
        </>
      )}

      {modeValue === "caravan" && (
        <div className="mb-3">
          <Caravan />
        </div>
      )}

      <Travel />
    </>
  );
}
