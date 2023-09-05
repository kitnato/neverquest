import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import type { GeneratorRange } from "@neverquest/types";

export function DodgePenaltyContents({
  staminaCost,
}: {
  staminaCost: GeneratorRange | number | null;
}) {
  return (
    <span>
      {staminaCost === null ? (
        <>Cannot dodge.</>
      ) : staminaCost === 0 ? (
        <>None.</>
      ) : (
        <>
          <IconImage Icon={IconStamina} size="tiny" />
          &nbsp;
          {typeof staminaCost === "number"
            ? staminaCost
            : `${staminaCost.minimum}-${staminaCost.maximum}`}
        </>
      )}
    </span>
  );
}
