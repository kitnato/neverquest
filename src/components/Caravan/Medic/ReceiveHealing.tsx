import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Coins } from "@neverquest/components/Resources/Coins";
import { MEDIC_PRICE_SURGERY, MEDIC_PRICE_SURGERY_CRITICAL } from "@neverquest/data/caravan";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/internal";
import { useHeal } from "@neverquest/hooks/actions/useHeal";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconSurgery } from "@neverquest/icons/surgery.svg";
import { isHealthAtMaximum, isHealthLow } from "@neverquest/state/reserves";
import { coins } from "@neverquest/state/resources";

export function ReceiveHealing() {
  const coinsValue = useRecoilValue(coins);
  const isHealthAtMaximumValue = useRecoilValue(isHealthAtMaximum);
  const isHealthLowValue = useRecoilValue(isHealthLow);

  const transactResources = useTransactResources();

  const price = isHealthLowValue ? MEDIC_PRICE_SURGERY_CRITICAL : MEDIC_PRICE_SURGERY;
  const isAffordable = price <= coinsValue;
  const isPurchasable = isAffordable && !isHealthAtMaximumValue;

  const heal = useHeal();

  const handleHeal = () => {
    heal();

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
            <span>
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
