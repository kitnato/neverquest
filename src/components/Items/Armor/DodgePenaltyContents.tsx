import { Stack } from "react-bootstrap";
import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import type { GeneratorRange } from "@neverquest/types";
import { formatValue } from "@neverquest/utilities/formatters";

export function DodgePenaltyContents({ staminaCost }: { staminaCost: GeneratorRange | number }) {
  return (
    <Stack direction="horizontal" gap={1}>
      {staminaCost === Infinity ? (
        <>Cannot dodge.</>
      ) : staminaCost === 0 ? (
        <>None.</>
      ) : (
        <>
          <IconImage Icon={IconStamina} size="small" />

          {typeof staminaCost === "number"
            ? formatValue({ value: staminaCost })
            : `${formatValue({ value: staminaCost.minimum })}-${formatValue({
                value: staminaCost.maximum,
              })}`}
        </>
      )}
    </Stack>
  );
}
