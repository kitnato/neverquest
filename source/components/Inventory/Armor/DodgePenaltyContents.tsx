import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LABEL_NONE } from "@neverquest/data/general";
import IconStalwart from "@neverquest/icons/stalwart.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { GeneratorRange } from "@neverquest/types";
import { isGeneratorRange } from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";

export function DodgePenaltyContents({ staminaCost }: { staminaCost: GeneratorRange | number }) {
  const isTraitAcquiredStalwart = useRecoilValue(isTraitAcquired("stalwart"));

  return (
    <Stack direction="horizontal" gap={1}>
      {typeof staminaCost === "number" && isTraitAcquiredStalwart ? (
        <IconDisplay Icon={IconStalwart} iconProps={{ className: "small" }}>
          <span>{LABEL_NONE}</span>
        </IconDisplay>
      ) : staminaCost === Number.POSITIVE_INFINITY ? (
        <span>Cannot dodge.</span>
      ) : staminaCost === 0 ? (
        <span>{LABEL_NONE}</span>
      ) : (
        <IconDisplay Icon={IconStamina} iconProps={{ className: "small" }}>
          <span>
            {isGeneratorRange(staminaCost)
              ? `${formatNumber({ value: staminaCost.minimum })} - ${formatNumber({
                  value: staminaCost.maximum,
                })}`
              : formatNumber({ value: staminaCost })}
          </span>
        </IconDisplay>
      )}
    </Stack>
  );
}
