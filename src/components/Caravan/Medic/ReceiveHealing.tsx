import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Coins } from "@neverquest/components/Resources/Coins";
import { MEDIC_PRICE_SURGERY, MEDIC_PRICE_SURGERY_CRITICAL } from "@neverquest/data/caravan";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/internal";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconSurgery } from "@neverquest/icons/surgery.svg";
import {
  currentHealth,
  isHealthAtMaximum,
  isHealthLow,
  maximumHealth,
} from "@neverquest/state/reserves";
import { coins } from "@neverquest/state/resources";

export function ReceiveHealing() {
  const coinsValue = useRecoilValue(coins);
  const currentHealthValue = useRecoilValue(currentHealth);
  const isHealthAtMaximumValue = useRecoilValue(isHealthAtMaximum);
  const isHealthLowValue = useRecoilValue(isHealthLow);
  const maximumHealthValue = useRecoilValue(maximumHealth);

  const changeHealth = useChangeHealth();
  const transactResources = useTransactResources();

  const price = isHealthLowValue ? MEDIC_PRICE_SURGERY_CRITICAL : MEDIC_PRICE_SURGERY;
  const healthDifference = maximumHealthValue - currentHealthValue;
  const isAffordable = price <= coinsValue;
  const isPurchasable = isAffordable && !isHealthAtMaximumValue;

  const handleHeal = () => {
    changeHealth({
      delta: {
        color: "text-success",
        value: `HEAL +${healthDifference}`,
      },
      value: healthDifference,
    });

    transactResources({ coinsDifference: -price });
  };

  return (
    <Stack gap={3}>
      <h6>Receive healing</h6>

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay
          contents="Undergo surgery to regain full health."
          Icon={IconSurgery}
          iconProps={{ overlayPlacement: "right" }}
          tooltip="Surgery"
        />

        <Stack direction="horizontal" gap={3}>
          <Coins tooltip="Price (coins)" value={price} />

          <OverlayTrigger
            overlay={
              <Tooltip>
                {!isAffordable && <div>Not enough coins!</div>}
                {isHealthAtMaximumValue && <div>Already at full health!</div>}
              </Tooltip>
            }
            trigger={isAffordable ? [] : ["hover", "focus"]}
          >
            <span className="d-inline-block">
              <Button disabled={!isPurchasable} onClick={handleHeal} variant="outline-dark">
                Heal
              </Button>
            </span>
          </OverlayTrigger>
        </Stack>
      </div>
    </Stack>
  );
}
