import { RecoilState, RecoilValueReadOnly } from "recoil";

import RegenerationMeter from "neverquest/components/Character/RegenerationMeter";
import FloatingText from "neverquest/components/FloatingText";
import { DeltaDisplay } from "neverquest/env";
import useDeltaText from "neverquest/hooks/useDeltaText";

export default function Regeneration({
  regenerationRate,
  atomResource,
  atomResourceDelta,
  atomDeltaRegenerationRate,
  isResourceMaxedOut,
}: {
  regenerationRate: RecoilValueReadOnly<number>;
  atomResource: RecoilState<number>;
  atomResourceDelta: RecoilState<DeltaDisplay>;
  atomDeltaRegenerationRate: RecoilState<DeltaDisplay>;
  isResourceMaxedOut: RecoilValueReadOnly<boolean>;
}) {
  useDeltaText({
    deltaAtom: atomDeltaRegenerationRate,
    isTime: true,
    valueAtom: regenerationRate,
  });

  return (
    <>
      <RegenerationMeter
        regenerationRate={regenerationRate}
        atomResource={atomResource}
        atomResourceDelta={atomResourceDelta}
        isResourceMaxedOut={isResourceMaxedOut}
      />

      <FloatingText atom={atomDeltaRegenerationRate} />
    </>
  );
}
