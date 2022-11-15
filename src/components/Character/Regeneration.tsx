import { RecoilState, RecoilValueReadOnly } from "recoil";

import RegenerationMeter from "@neverquest/components/Character/RegenerationMeter";
import FloatingText from "@neverquest/components/FloatingText";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { DeltaDisplay, DeltaReserve } from "@neverquest/types/ui";

export default function ({
  atomDeltaRegenerationRate,
  handleChangeReserve,
  isReserveMaxedOut,
  regenerationRate,
}: {
  atomDeltaRegenerationRate: RecoilState<DeltaDisplay>;
  handleChangeReserve: (change: DeltaReserve) => void;
  isReserveMaxedOut: RecoilValueReadOnly<boolean>;
  regenerationRate: RecoilValueReadOnly<number>;
}) {
  useDeltaText({
    deltaAtom: atomDeltaRegenerationRate,
    isTime: true,
    valueAtom: regenerationRate,
  });

  return (
    <>
      <RegenerationMeter
        handleChangeReserve={handleChangeReserve}
        isReserveMaxedOut={isReserveMaxedOut}
        regenerationRate={regenerationRate}
      />

      <FloatingText atom={atomDeltaRegenerationRate} />
    </>
  );
}
