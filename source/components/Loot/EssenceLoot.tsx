import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { AttributePointProgress } from "@neverquest/components/Attributes/AttributePointProgress";
import { NewAttributePoints } from "@neverquest/components/Attributes/NewAttributePoints";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { isShowing } from "@neverquest/state/isShowing";
import { essenceLoot } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function EssenceLoot() {
  const essenceLootValue = useRecoilValue(essenceLoot);
  const isShowingLootedEssenceProgress = useRecoilValue(isShowing("lootedEssenceProgress"));

  useDeltaText({
    delta: "essenceLoot",
    state: essenceLoot,
  });

  if (essenceLootValue > 0) {
    return (
      <Stack className={getAnimationClass({ animation: "flipInX" })} direction="horizontal" gap={5}>
        <Stack direction="horizontal" gap={1}>
          <IconDisplay Icon={IconEssence} tooltip="Looted essence">
            <span>{formatNumber({ value: essenceLootValue })}</span>
          </IconDisplay>

          <DeltasDisplay delta="essenceLoot" />
        </Stack>

        {isShowingLootedEssenceProgress && (
          <AttributePointProgress extraEssence={essenceLootValue} />
        )}

        {isShowingLootedEssenceProgress && <NewAttributePoints />}
      </Stack>
    );
  }
}
