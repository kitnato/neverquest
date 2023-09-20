import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { OCCULTIST_PURGE_PRICE_MULTIPLIER } from "@neverquest/data/caravan";
import { useResetAttributes } from "@neverquest/hooks/actions/useResetAttributes";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconPurge } from "@neverquest/icons/purge.svg";
import { essenceAbsorbed } from "@neverquest/state/attributes";
import { coins } from "@neverquest/state/resources";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

export function PurgeEssence() {
  const coinsValue = useRecoilValue(coins);
  const essenceAbsorbedValue = useRecoilValue(essenceAbsorbed);

  const resetAttributes = useResetAttributes();
  const transactResources = useTransactResources();

  const price = Math.round(essenceAbsorbedValue * OCCULTIST_PURGE_PRICE_MULTIPLIER);
  const isAffordable = price <= coinsValue;
  const isPurchasable = isAffordable && price > 0;

  const handlePurge = () => {
    transactResources({ coinsDifference: -price, essenceDifference: essenceAbsorbedValue });
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
          <ResourceDisplay tooltip="Price (coins)" type="coins" value={price} />

          <OverlayTrigger
            overlay={
              <Tooltip>
                {!isAffordable && <div>Insufficient coins!</div>}
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
