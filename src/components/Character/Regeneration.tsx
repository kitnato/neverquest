import { RecoilState, RecoilValueReadOnly } from "recoil";

import RegenerationMeter from "@neverquest/components/Character/RegenerationMeter";
import FloatingText from "@neverquest/components/FloatingText";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { DeltaDisplay, DeltaReserve } from "@neverquest/types/ui";

export default function ({
  atomDeltaRegenerationRate,
  atomReserve,
  isReserveMaxedOut,
  regenerationRate,
}: {
  atomDeltaRegenerationRate: RecoilState<DeltaDisplay>;
  atomReserve: RecoilState<DeltaReserve>;
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
        atomReserve={atomReserve}
        isReserveMaxedOut={isReserveMaxedOut}
        regenerationRate={regenerationRate}
      />

      <FloatingText atom={atomDeltaRegenerationRate} />
    </>
  );
}
