import { RecoilState, RecoilValueReadOnly } from "recoil";

import RegenerationMeter from "@neverquest/components/Character/RegenerationMeter";
import FloatingText from "@neverquest/components/FloatingText";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { HealthChangeProps } from "@neverquest/types/props";
import { DeltaDisplay } from "@neverquest/types/ui";

export default function Regeneration({
  atomReserve,
  atomDeltaRegenerationRate,
  isReserveMaxedOut,
  regenerationRate,
}: {
  atomReserve: RecoilState<HealthChangeProps>;
  atomDeltaRegenerationRate: RecoilState<DeltaDisplay>;
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
