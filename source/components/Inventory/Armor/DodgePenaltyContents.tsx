import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LABEL_NONE } from "@neverquest/data/general";
import IconStalwart from "@neverquest/icons/stalwart.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { GeneratorRange } from "@neverquest/types";
import { formatNumber } from "@neverquest/utilities/formatters";

export function DodgePenaltyContents({ staminaCost }: { staminaCost?: GeneratorRange | number }) {
  const isTraitAcquiredStalwart = useRecoilValue(isTraitAcquired("stalwart"));

  return (
    <Stack direction="horizontal" gap={1}>
      {isTraitAcquiredStalwart ? (
        <>
          <IconImage Icon={IconStalwart} isSmall />

          {LABEL_NONE}
        </>
      ) : staminaCost === undefined ? (
        <>Cannot dodge.</>
      ) : staminaCost === 0 ? (
        LABEL_NONE
      ) : (
        <>
          <IconImage Icon={IconStamina} isSmall />

          {typeof staminaCost === "number"
            ? formatNumber({ value: staminaCost })
            : `${formatNumber({ value: staminaCost.minimum })}-${formatNumber({
                value: staminaCost.maximum,
              })}`}
        </>
      )}
    </Stack>
  );
}