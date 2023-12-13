import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MEDIC_PRICE_SURGERY } from "@neverquest/data/caravan";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_FULL_HEALTH,
  LABEL_NO_ESSENCE,
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

  const { critical, normal } = MEDIC_PRICE_SURGERY;
  const price = isHealthLowValue ? critical : normal;
  const isAffordable = price <= essenceValue;
  const isPurchasable = isAffordable && !isHealthAtMaximumValue;

  const heal = useHeal();

  return (
    <Stack gap={3}>
      <h6>Receive healing</h6>

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay Icon={IconHealing} tooltip="Healing">
          {isHealthLowValue ? "Emergency treatment" : "Minor surgery"}
        </IconDisplay>

        <Stack direction="horizontal" gap={3}>
          <IconDisplay Icon={IconEssence} tooltip="Price">
            {formatNumber({ value: price })}
          </IconDisplay>

          <OverlayTrigger
            overlay={
              <Tooltip>
                {!isAffordable && <div> {LABEL_NO_ESSENCE}</div>}

                {isHealthAtMaximumValue && <div>{LABEL_FULL_HEALTH}</div>}
              </Tooltip>
            }
            trigger={isPurchasable ? [] : ["focus", "hover"]}
          >
            <div>
              <Button
                disabled={!isPurchasable}
                onClick={() => {
                  heal();

                  transactEssence(-price);
                }}
                variant="outline-dark"
              >
                Operate
              </Button>
            </div>
          </OverlayTrigger>
        </Stack>
      </div>
    </Stack>
  );
}
