import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { TAILORING_EXPANSION, TAILORING_PRICES_MAXIMUM } from "@neverquest/data/caravan";
import { AMMUNITION_MAXIMUM } from "@neverquest/data/inventory";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { ReactComponent as IconTailoring } from "@neverquest/icons/tailoring.svg";
import { inventory } from "@neverquest/state/inventory";
import { ownedItem } from "@neverquest/state/items";
import { essence } from "@neverquest/state/resources";
import type { TrinketItemAmmunitionPouch } from "@neverquest/types";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_NO_ESSENCE } from "@neverquest/utilities/constants";
import { formatValue } from "@neverquest/utilities/formatters";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

export function ExpandAmmunitionPouch() {
  const essenceValue = useRecoilValue(essence);
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));
  const setInventory = useSetRecoilState(inventory);

  const transactEssence = useTransactEssence();

  if (ownedAmmunitionPouch === null) {
    return null;
  }

  const { id, maximum } = ownedAmmunitionPouch as TrinketItemAmmunitionPouch;
  const price = Math.ceil(
    TAILORING_PRICES_MAXIMUM.ammunitionPouch * getGrowthSigmoid(maximum - (AMMUNITION_MAXIMUM - 1)),
  );
  const isAffordable = price <= essenceValue;

  const handleExpansion = () => {
    transactEssence(-price);
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
        <IconDisplay contents={formatValue({ value: price })} Icon={IconEssence} tooltip="Price" />

        <OverlayTrigger
          overlay={<Tooltip> {LABEL_NO_ESSENCE}</Tooltip>}
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
