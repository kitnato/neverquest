import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MEDIC_PRICE_SURGERY } from "@neverquest/data/caravan";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_FULL_HEALTH,
  LABEL_NO_ESSENCE,
  POPOVER_TRIGGER,
} from "@neverquest/data/general";
import { useHeal } from "@neverquest/hooks/actions/useHeal";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconHealing from "@neverquest/icons/healing.svg?react";
import { isHealthAtMaximum, isHealthLow } from "@neverquest/state/reserves";
import { essence } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";

export function ReceiveHealing() {
  const essenceValue = useRecoilValue(essence);
  const isHealthAtMaximumValue = useRecoilValue(isHealthAtMaximum);
  const isHealthLowValue = useRecoilValue(isHealthLow);

  const transactEssence = useTransactEssence();

  const isAffordable = MEDIC_PRICE_SURGERY <= essenceValue;
  const isPurchasable = isAffordable && !isHealthAtMaximumValue;

  const heal = useHeal();

  return (
    <Stack gap={3}>
      <h6>Receive healing</h6>

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay Icon={IconHealing} tooltip="Healing">
          <span>{isHealthLowValue ? "Emergency treatment" : "Minor surgery"}</span>
        </IconDisplay>

        <Stack className="ms-2" direction="horizontal" gap={3}>
          <IconDisplay Icon={IconEssence} tooltip="Price">
            <span>{formatNumber({ value: MEDIC_PRICE_SURGERY })}</span>
          </IconDisplay>

          <OverlayTrigger
            overlay={
              <Tooltip>
                <Stack>
                  {!isAffordable && <span>{LABEL_NO_ESSENCE}</span>}

                  {isHealthAtMaximumValue && <span>{LABEL_FULL_HEALTH}</span>}
                </Stack>
              </Tooltip>
            }
            trigger={isPurchasable ? [] : POPOVER_TRIGGER}
          >
            <div>
              <Button
                disabled={!isPurchasable}
                onClick={() => {
                  heal();

                  transactEssence(-MEDIC_PRICE_SURGERY);
                }}
                variant="outline-dark"
              >
                <span>Operate</span>
              </Button>
            </div>
          </OverlayTrigger>
        </Stack>
      </div>
    </Stack>
  );
}
