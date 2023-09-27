import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { MEDIC_PRICE_SURGERY, MEDIC_PRICE_SURGERY_CRITICAL } from "@neverquest/data/caravan";
import { useHeal } from "@neverquest/hooks/actions/useHeal";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { ReactComponent as IconSurgery } from "@neverquest/icons/surgery.svg";
import { isHealthAtMaximum, isHealthLow } from "@neverquest/state/reserves";
import { essence } from "@neverquest/state/resources";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

export function ReceiveHealing() {
  const essenceValue = useRecoilValue(essence);
  const isHealthAtMaximumValue = useRecoilValue(isHealthAtMaximum);
  const isHealthLowValue = useRecoilValue(isHealthLow);

  const transactEssence = useTransactEssence();

  const price = isHealthLowValue ? MEDIC_PRICE_SURGERY_CRITICAL : MEDIC_PRICE_SURGERY;
  const isAffordable = price <= essenceValue;
  const isPurchasable = isAffordable && !isHealthAtMaximumValue;

  const heal = useHeal();

  const handleHeal = () => {
    heal();

    transactEssence(-price);
  };

  return (
    <Stack gap={3}>
      <h6>Receive healing</h6>

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay contents="Regain full health" Icon={IconSurgery} tooltip="Surgery" />

        <Stack direction="horizontal" gap={3}>
          <IconDisplay
            contents={formatValue({ value: price })}
            Icon={IconEssence}
            tooltip="Price"
          />

          <OverlayTrigger
            overlay={
              <Tooltip>
                {!isAffordable && <div>Insufficient essence!</div>}
                {isHealthAtMaximumValue && <div>Already at full health!</div>}
              </Tooltip>
            }
            trigger={isPurchasable ? [] : ["hover", "focus"]}
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
