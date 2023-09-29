import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import type { GeneratorRange } from "@neverquest/types";
import { formatValue } from "@neverquest/utilities/formatters";

export function DodgePenaltyContents({ staminaCost }: { staminaCost: GeneratorRange | number }) {
  return (
    <span>
      {staminaCost === Infinity ? (
        <>Cannot dodge.</>
      ) : staminaCost === 0 ? (
        <>None.</>
      ) : (
        <>
          <IconImage Icon={IconStamina} size="tiny" />
          &nbsp;
          {typeof staminaCost === "number"
            ? formatValue({ value: staminaCost })
            : `${formatValue({ value: staminaCost.minimum })}-${formatValue({
                value: staminaCost.maximum,
              })}`}
        </>
      )}
    </span>
  );
}
