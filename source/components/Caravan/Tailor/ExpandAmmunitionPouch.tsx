import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { AmmunitionPouchCapacity } from "@neverquest/components/Caravan/Tailor/AmmunitionPouchCapacity";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { TAILORING } from "@neverquest/data/caravan";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_NO_ESSENCE,
  POPOVER_TRIGGER,
} from "@neverquest/data/general";
import { AMMUNITION_CAPACITY } from "@neverquest/data/items";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconTailoring from "@neverquest/icons/tailoring.svg?react";
import { ammunitionCapacity } from "@neverquest/state/items";
import { essence } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getFromRange, getSigmoid } from "@neverquest/utilities/getters";

export function ExpandAmmunitionPouch() {
  const [ammunitionCapacityValue, setAmmunitionCapacity] = useRecoilState(ammunitionCapacity);
  const essenceValue = useRecoilValue(essence);

  const transactEssence = useTransactEssence();

  const { amount, priceRange } = TAILORING["ammunition pouch"];
  const price = Math.ceil(
    getFromRange({
      factor: getSigmoid((ammunitionCapacityValue - (AMMUNITION_CAPACITY - amount)) / amount),
      ...priceRange,
    }),
  );
  const isAffordable = price <= essenceValue;

  return (
    <Stack gap={3}>
      <h6>Ammunition pouch</h6>

      <AmmunitionPouchCapacity />

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay
          description={`Increases maximum ammunition by ${amount}.`}
          Icon={IconTailoring}
          tooltip="Tailoring"
        >
          Add quiver
        </IconDisplay>

        <Stack className="ms-2" direction="horizontal" gap={3}>
          <IconDisplay Icon={IconEssence} tooltip="Price">
            {formatNumber({ value: price })}
          </IconDisplay>

          <OverlayTrigger
            overlay={<Tooltip> {LABEL_NO_ESSENCE}</Tooltip>}
            trigger={isAffordable ? [] : POPOVER_TRIGGER}
          >
            <div>
              <Button
                disabled={!isAffordable}
                onClick={() => {
                  transactEssence(-price);
                  setAmmunitionCapacity(
                    (currentAmmunitionCapacity) => currentAmmunitionCapacity + amount,
                  );
                }}
                variant="outline-dark"
              >
                Expand
              </Button>
            </div>
          </OverlayTrigger>
        </Stack>
      </div>
    </Stack>
  );
}
