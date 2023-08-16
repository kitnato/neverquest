import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { useForfeitItem } from "@neverquest/hooks/actions/useForfeitItem";
import { useMerchantTradeItem } from "@neverquest/hooks/actions/useMerchantTradeItem";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { inventory } from "@neverquest/state/inventory";
import { confirmationWarnings } from "@neverquest/state/settings";
import type { InventoryItem } from "@neverquest/types";
import {
  isArmor,
  isConsumable,
  isGear,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { getSellPrice } from "@neverquest/utilities/getters";

export function SellItems() {
  const confirmationWarningsValue = useRecoilValue(confirmationWarnings);
  const inventoryValue = useRecoilValue(inventory);

  const [isShowingSellWarning, setShowingSellWarning] = useState(false);
  const [sellConfirmation, setSellConfirmation] = useState<InventoryItem | null>(null);

  const forfeitItem = useForfeitItem();
  const merchantTradeItem = useMerchantTradeItem();
  const transactResources = useTransactResources();

  const sellItem = (item: InventoryItem) => {
    forfeitItem(item);
    transactResources({ coinsDifference: getSellPrice(item) });
    merchantTradeItem(item, "sale");
    setSellConfirmation(null);
  };

  const equippedGear = [
    ...inventoryValue.filter((current) => isGear(current) && current.isEquipped),
  ];
  const storedItems = inventoryValue.filter(
    (current) => !isGear(current) || (isGear(current) && !current.isEquipped),
  );

  const SellItem = ({
    item,
    showConfirmation,
  }: {
    item: InventoryItem;
    showConfirmation?: boolean;
  }) => (
    <Stack direction="horizontal" gap={3}>
      <ResourceDisplay tooltip="Value (coins)" type="coins" value={getSellPrice(item)} />

      <Button
        onClick={() => {
          if (confirmationWarningsValue && showConfirmation) {
            setSellConfirmation(item);
            setShowingSellWarning(true);
          } else {
            sellItem(item);
          }
        }}
        variant="outline-dark"
      >
        Sell
      </Button>
    </Stack>
  );

  return (
    <Stack gap={3}>
      <h6>Sell items</h6>

      {inventoryValue.length === 0 ? (
        <span className="fst-italic">Nothing to sell.</span>
      ) : (
        <Stack gap={3}>
          {[equippedGear.find(isWeapon), equippedGear.find(isArmor), equippedGear.find(isShield)]
            .filter(isGear)
            .map((current) => {
              const { id, isEquipped } = current;

              return (
                <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
                  <Stack direction="horizontal">
                    <ItemDisplay item={current} overlayPlacement="right" />

                    {isEquipped && (
                      <span className="fst-italic" style={{ width: "max-content" }}>
                        &nbsp;(Equipped)
                      </span>
                    )}
                  </Stack>

                  <SellItem item={current} showConfirmation={isEquipped} />
                </div>
              );
            })}

          {storedItems
            .filter(isGear)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((current) => {
              return (
                <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={current.id}>
                  <ItemDisplay item={current} overlayPlacement="right" />

                  <SellItem item={current} />
                </div>
              );
            })}

          {[...storedItems.filter(isTrinket), ...storedItems.filter(isConsumable)]
            .sort((a, b) => a.type.localeCompare(b.type))
            .map((current) => {
              return (
                <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={current.id}>
                  <ItemDisplay item={current} overlayPlacement="right" />

                  <SellItem item={current} />
                </div>
              );
            })}

          {sellConfirmation !== null && (
            <ConfirmationDialog
              confirmationLabel="Sell"
              message="It can be bought back at the original purchase price but it will be gone forever once leaving the caravan."
              onConfirm={() => sellItem(sellConfirmation)}
              setHidden={() => setShowingSellWarning(false)}
              show={isShowingSellWarning}
              title="Sell equipped item?"
            />
          )}
        </Stack>
      )}
    </Stack>
  );
}
