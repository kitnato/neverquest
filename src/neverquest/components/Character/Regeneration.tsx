import { Atom, PrimitiveAtom, WritableAtom } from "jotai";

import RegenerationMeter from "neverquest/components/Character/RegenerationMeter";
import FloatingText from "neverquest/components/FloatingText";
import useDeltaText from "neverquest/hooks/useDeltaText";
import { DeltaDisplay } from "neverquest/types/ui";

export default function Regeneration({
  regenerationRate,
  atomReserve,
  atomReserveDelta,
  atomDeltaRegenerationRate,
  isReserveMaxedOut,
}: {
  regenerationRate: Atom<number>;
  atomReserve: PrimitiveAtom<number>;
  atomReserveDelta: WritableAtom<DeltaDisplay, DeltaDisplay>;
  atomDeltaRegenerationRate: PrimitiveAtom<DeltaDisplay>;
  isReserveMaxedOut: Atom<boolean>;
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
        atomReserveDelta={atomReserveDelta}
        isReserveMaxedOut={isReserveMaxedOut}
        regenerationRate={regenerationRate}
      />

      <FloatingText atom={atomDeltaRegenerationRate} />
    </>
  );
}
