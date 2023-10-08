import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { OCCULTIST_PURGE_PRICE_MULTIPLIER } from "@neverquest/data/caravan";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_NO_ESSENCE } from "@neverquest/data/general";
import { useResetAttributes } from "@neverquest/hooks/actions/useResetAttributes";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { ReactComponent as IconPurge } from "@neverquest/icons/purge.svg";
import { absorbedEssence } from "@neverquest/state/attributes";
import { essence } from "@neverquest/state/resources";
import { formatValue } from "@neverquest/utilities/formatters";

export function PurgeEssence() {
  const essenceValue = useRecoilValue(essence);
  const absorbedEssenceValue = useRecoilValue(absorbedEssence);

  const resetAttributes = useResetAttributes();
  const transactEssence = useTransactEssence();

  const price = Math.round(absorbedEssenceValue * OCCULTIST_PURGE_PRICE_MULTIPLIER);
  const isAffordable = price <= essenceValue;
  const isPurchasable = isAffordable && price > 0;

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
                {!isAffordable && <div>{LABEL_NO_ESSENCE}</div>}

                {price === 0 && <div>No essence to purge.</div>}
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
                }}
                variant="outline-dark"
              >
                Purge
              </Button>
            </span>
          </OverlayTrigger>
        </Stack>
      </div>
    </Stack>
  );
}
