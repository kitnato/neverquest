import { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { useMerchantTradeItem } from "@neverquest/hooks/actions/useMerchantTradeItem";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { inventory } from "@neverquest/state/inventory";
import { confirmationWarnings } from "@neverquest/state/settings";
import type { InventoryItem } from "@neverquest/types";
import { getSellPrice } from "@neverquest/utilities/getters";

export function SellItem({
  item,
  showConfirmation,
}: {
  item: InventoryItem;
  showConfirmation?: boolean;
}) {
  const confirmationWarningsValue = useRecoilValue(confirmationWarnings);
  const setInventory = useSetRecoilState(inventory);

  const [isShowingSellWarning, setShowingSellWarning] = useState(false);
  const [sellConfirmation, setSellConfirmation] = useState(false);

  const merchantTradeItem = useMerchantTradeItem();
  const transactResources = useTransactResources();

  const handleSale = () => {
    if (confirmationWarningsValue && showConfirmation) {
      setSellConfirmation(true);
      setShowingSellWarning(true);
    } else {
      sellItem();
    }
  };
  const sellItem = () => {
    transactResources({ coinsDifference: getSellPrice(item) });
    merchantTradeItem(item, "sale");

    setInventory((current) => current.filter((current) => current.id !== item.id));
    setSellConfirmation(false);
  };

  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <ResourceDisplay tooltip="Value (coins)" type="coins" value={getSellPrice(item)} />

        <Button onClick={handleSale} variant="outline-dark">
          Sell
        </Button>
      </Stack>

      {sellConfirmation !== null && (
        <ConfirmationDialog
          confirmationLabel="Sell"
          message="It can be bought back at the original purchase price but it will be gone forever once leaving the caravan."
          onConfirm={sellItem}
          setHidden={() => setShowingSellWarning(false)}
          show={isShowingSellWarning}
          title="Sell equipped item?"
        />
      )}
    </>
  );
}
