import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { OCCULTIST_PURGE_PRICE_MULTIPLIER } from "@neverquest/data/caravan";
import { useResetAttributes } from "@neverquest/hooks/actions/useResetAttributes";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { ReactComponent as IconPurge } from "@neverquest/icons/purge.svg";
import { essenceAbsorbed } from "@neverquest/state/attributes";
import { essence } from "@neverquest/state/resources";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";

export function PurgeEssence() {
  const essenceValue = useRecoilValue(essence);
  const essenceAbsorbedValue = useRecoilValue(essenceAbsorbed);

  const resetAttributes = useResetAttributes();
  const transactEssence = useTransactEssence();

  const price = Math.round(essenceAbsorbedValue * OCCULTIST_PURGE_PRICE_MULTIPLIER);
  const isAffordable = price <= essenceValue;
  const isPurchasable = isAffordable && price > 0;

  const handlePurge = () => {
    transactEssence(-price);
    transactEssence(essenceAbsorbedValue);

    resetAttributes();
  };

  return (
    <Stack gap={3}>
      <h6>Rituals</h6>

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay
          contents="Purge essence"
          description="Resets power level to 0, refunding all absorbed essence."
          Icon={IconPurge}
          tooltip="Ritual"
        />

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
                {price === 0 && <div>No essence to purge!</div>}
              </Tooltip>
            }
            trigger={isPurchasable ? [] : ["hover", "focus"]}
          >
            <span>
              <Button disabled={!isPurchasable} onClick={handlePurge} variant="outline-dark">
                Purge
              </Button>
            </span>
          </OverlayTrigger>
        </Stack>
      </div>
    </Stack>
  );
}
