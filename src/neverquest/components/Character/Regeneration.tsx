import { Atom, PrimitiveAtom, WritableAtom } from "jotai";

import RegenerationMeter from "neverquest/components/Character/RegenerationMeter";
import FloatingText from "neverquest/components/FloatingText";
import useDeltaText from "neverquest/hooks/useDeltaText";
import { DeltaDisplay } from "neverquest/types/ui";

export default function Regeneration({
  regenerationRate,
  atomResource,
  atomResourceDelta,
  atomDeltaRegenerationRate,
  isResourceMaxedOut,
}: {
  regenerationRate: Atom<number>;
  atomResource: PrimitiveAtom<number>;
  atomResourceDelta: WritableAtom<DeltaDisplay, DeltaDisplay>;
  atomDeltaRegenerationRate: PrimitiveAtom<DeltaDisplay>;
  isResourceMaxedOut: Atom<boolean>;
}) {
  useDeltaText({
    deltaAtom: atomDeltaRegenerationRate,
    isTime: true,
    valueAtom: regenerationRate,
  });

  return (
    <>
      <RegenerationMeter
        atomResource={atomResource}
        atomResourceDelta={atomResourceDelta}
        isResourceMaxedOut={isResourceMaxedOut}
        regenerationRate={regenerationRate}
      />

      <FloatingText atom={atomDeltaRegenerationRate} />
    </>
  );
}
