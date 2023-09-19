import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { TAILORING_EXPANSION, TAILORING_PRICES_MAXIMUM } from "@neverquest/data/caravan";
import { AMMUNITION_MAXIMUM } from "@neverquest/data/inventory";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconTailoring } from "@neverquest/icons/tailoring.svg";
import { inventory } from "@neverquest/state/inventory";
import { ownedItem } from "@neverquest/state/items";
import { coins } from "@neverquest/state/resources";
import type { TrinketItemAmmunitionPouch } from "@neverquest/types";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

export function ExpandAmmunitionPouch() {
  const coinsValue = useRecoilValue(coins);
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));
  const setInventory = useSetRecoilState(inventory);

  const transactResources = useTransactResources();

  if (ownedAmmunitionPouch === null) {
    return null;
  }

  const { id, maximum } = ownedAmmunitionPouch as TrinketItemAmmunitionPouch;
  const price = Math.ceil(
    TAILORING_PRICES_MAXIMUM.ammunitionPouch * getGrowthSigmoid(maximum - (AMMUNITION_MAXIMUM - 1)),
  );
  const isAffordable = price <= coinsValue;

  const handleExpansion = () => {
    transactResources({ coinsDifference: -price });
    setInventory((currentInventory) =>
      currentInventory.map((currentItem) =>
        currentItem.id === id
          ? {
              ...currentItem,
              maximum:
                (currentItem as TrinketItemAmmunitionPouch).maximum +
                TAILORING_EXPANSION.ammunitionPouch,
            }
          : currentItem,
      ),
    );
  };

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay
        contents="Add quiver"
        description={`Increases maximum ammunition by ${TAILORING_EXPANSION.ammunitionPouch}.`}
        Icon={IconTailoring}
        tooltip="Tailoring"
      />

      <Stack direction="horizontal" gap={3}>
        <ResourceDisplay tooltip="Price (coins)" type="coins" value={price} />

        <OverlayTrigger
          overlay={<Tooltip>Not enough coins!</Tooltip>}
          trigger={isAffordable ? [] : ["hover", "focus"]}
        >
          <span>
            <Button disabled={!isAffordable} onClick={handleExpansion} variant="outline-dark">
              Expand
            </Button>
          </span>
        </OverlayTrigger>
      </Stack>
    </div>
  );
}
