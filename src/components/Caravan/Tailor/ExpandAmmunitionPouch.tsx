import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { AmmunitionPouchCapacity } from "@neverquest/components/Caravan/Tailor/AmmunitionPouchCapacity";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { TAILORING_EXPANSION, TAILORING_PRICE_MAXIMUM } from "@neverquest/data/caravan";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_NO_ESSENCE } from "@neverquest/data/general";
import { AMMUNITION_CAPACITY } from "@neverquest/data/inventory";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconTailoring from "@neverquest/icons/tailoring.svg?react";
import { inventory, ownedItem } from "@neverquest/state/inventory";
import { essence } from "@neverquest/state/resources";
import type { AmmunitionPouchItem } from "@neverquest/types";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

export function ExpandAmmunitionPouch() {
  const essenceValue = useRecoilValue(essence);
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));
  const setInventory = useSetRecoilState(inventory);

  const transactEssence = useTransactEssence();

  if (ownedAmmunitionPouch === null) {
    return null;
  }

  const { id, maximum } = ownedAmmunitionPouch as AmmunitionPouchItem;
  const price = Math.ceil(
    TAILORING_PRICE_MAXIMUM.ammunitionPouch * getGrowthSigmoid(maximum - (AMMUNITION_CAPACITY - 1)),
  );
  const isAffordable = price <= essenceValue;

  return (
    <Stack gap={3}>
      <h6>Ammunition pouch</h6>

      <AmmunitionPouchCapacity />

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay
          description={`Increases maximum ammunition by ${TAILORING_EXPANSION.ammunitionPouch}.`}
          Icon={IconTailoring}
          tooltip="Tailoring"
        >
          Add quiver
        </IconDisplay>

        <Stack direction="horizontal" gap={3}>
          <IconDisplay Icon={IconEssence} tooltip="Price">
            {formatNumber({ value: price })}
          </IconDisplay>

          <OverlayTrigger
            overlay={<Tooltip> {LABEL_NO_ESSENCE}</Tooltip>}
            trigger={isAffordable ? [] : ["hover", "focus"]}
          >
            <span>
              <Button
                disabled={!isAffordable}
                onClick={() => {
                  transactEssence(-price);
                  setInventory((currentInventory) =>
                    currentInventory.map((currentItem) =>
                      currentItem.id === id
                        ? {
                            ...currentItem,
                            maximum:
                              (currentItem as AmmunitionPouchItem).maximum +
                              TAILORING_EXPANSION.ammunitionPouch,
                          }
                        : currentItem,
                    ),
                  );
                }}
                variant="outline-dark"
              >
                Expand
              </Button>
            </span>
          </OverlayTrigger>
        </Stack>
      </div>
    </Stack>
  );
}
