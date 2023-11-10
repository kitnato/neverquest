import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { OCCULTIST_PURGE_PRICE_MULTIPLIER } from "@neverquest/data/caravan";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_NO_ESSENCE } from "@neverquest/data/general";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useResetAttributes } from "@neverquest/hooks/actions/useResetAttributes";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconRitual from "@neverquest/icons/ritual.svg?react";
import { absorbedEssence } from "@neverquest/state/attributes";
import { essence } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";

export function PurgeEssence() {
  const essenceValue = useRecoilValue(essence);
  const absorbedEssenceValue = useRecoilValue(absorbedEssence);

  const progressQuest = useProgressQuest();
  const resetAttributes = useResetAttributes();
  const transactEssence = useTransactEssence();

  const price = Math.round(absorbedEssenceValue * OCCULTIST_PURGE_PRICE_MULTIPLIER.essence);
  const isAffordable = price <= essenceValue;
  const isPurchasable = isAffordable && absorbedEssenceValue > 0;

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay
        description="Resets power level to 0, refunding all absorbed essence."
        Icon={IconRitual}
        tooltip="Ritual"
      >
        Purge essence
      </IconDisplay>

      <Stack direction="horizontal" gap={3}>
        <IconDisplay Icon={IconEssence} tooltip="Price">
          {formatNumber({ value: price })}
        </IconDisplay>

        <OverlayTrigger
          overlay={
            <Tooltip>
              {!isAffordable && <div>{LABEL_NO_ESSENCE}</div>}

              {absorbedEssenceValue === 0 && <div>No essence to purge.</div>}
            </Tooltip>
          }
          trigger={isPurchasable ? [] : ["hover", "focus"]}
        >
          <span>
            <Button
              disabled={!isPurchasable}
              onClick={() => {
                transactEssence(-price);
                transactEssence(absorbedEssenceValue);

                resetAttributes();

                progressQuest({ quest: "purgingEssence" });
              }}
              variant="outline-dark"
            >
              Purge
            </Button>
          </span>
        </OverlayTrigger>
      </Stack>
    </div>
  );
}
