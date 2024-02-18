import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DescriptionDisplay } from "@neverquest/components/DescriptionDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { OCCULTIST_PURGE_PRICE_MULTIPLIER } from "@neverquest/data/caravan";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_NO_ESSENCE,
  POPOVER_TRIGGER,
} from "@neverquest/data/general";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useResetAttributes } from "@neverquest/hooks/actions/useResetAttributes";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconPowerLevel from "@neverquest/icons/power-level.svg?react";
import IconPurgeEssence from "@neverquest/icons/purge-essence.svg?react";
import { absorbedEssence } from "@neverquest/state/attributes";
import { essence } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";

export function PurgeEssence() {
  const essenceValue = useRecoilValue(essence);
  const absorbedEssenceValue = useRecoilValue(absorbedEssence);

  const progressQuest = useProgressQuest();
  const resetAttributes = useResetAttributes();
  const transactEssence = useTransactEssence();

  const hasAbsorbedEssence = absorbedEssenceValue > 0;
  const price = Math.ceil(absorbedEssenceValue * OCCULTIST_PURGE_PRICE_MULTIPLIER.essence);
  const isAffordable = price <= essenceValue;
  const isPurchasable = hasAbsorbedEssence && isAffordable;

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay
        description={
          <DescriptionDisplay
            description="Resets # power level to 0, refunding all absorbed # essence."
            descriptionIcons={[IconPowerLevel, IconEssence]}
          />
        }
        Icon={IconPurgeEssence}
        tooltip="Ritual"
      >
        Purge essence
      </IconDisplay>

      <Stack className="ms-2" direction="horizontal" gap={3}>
        <IconDisplay Icon={IconEssence} tooltip="Price">
          {formatNumber({ value: price })}
        </IconDisplay>

        <OverlayTrigger
          overlay={
            <Tooltip>
              <Stack>
                {!isAffordable && <span>{LABEL_NO_ESSENCE}</span>}

                {!hasAbsorbedEssence && <span>No essence to purge.</span>}
              </Stack>
            </Tooltip>
          }
          trigger={isPurchasable ? [] : POPOVER_TRIGGER}
        >
          <div>
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
              <span>Purge</span>
            </Button>
          </div>
        </OverlayTrigger>
      </Stack>
    </div>
  );
}
