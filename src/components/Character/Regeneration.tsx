import { RegenerationMeter } from "@neverquest/components/Character/RegenerationMeter";
import { FloatingText } from "@neverquest/components/FloatingText";
import { RESERVES } from "@neverquest/data/reserves";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { DeltaTextType, DeltaType, ReserveType } from "@neverquest/types/enums";

export function Regeneration({ type }: { type: ReserveType.Health | ReserveType.Stamina }) {
  const { atomDeltaRegenerationRate, atomRegenerationRate } = RESERVES[type];

  useDeltaText({
    atomDelta: atomDeltaRegenerationRate,
    atomValue: atomRegenerationRate,
    type: DeltaTextType.Time,
  });

  return (
    <>
      <RegenerationMeter type={type} />

      <FloatingText
        type={
          ReserveType.Health ? DeltaType.HealthRegenerationRate : DeltaType.StaminaRegenerationRate
        }
      />
    </>
  );
}
