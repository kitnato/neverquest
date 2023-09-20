import { Button, Stack } from "react-bootstrap";
import { useSetRecoilState } from "recoil";

import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { useMerchantTradeItem } from "@neverquest/hooks/actions/useMerchantTradeItem";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { inventory } from "@neverquest/state/inventory";
import type { InventoryItem } from "@neverquest/types";
import { getSellPrice } from "@neverquest/utilities/getters";

export function SellItem({ item }: { item: InventoryItem }) {
  const setInventory = useSetRecoilState(inventory);

  const merchantTradeItem = useMerchantTradeItem();
  const transactResources = useTransactResources();

  const handleSale = () => {
    transactResources({ coinsDifference: getSellPrice(item) });
    merchantTradeItem(item, "sale");

    setInventory((current) => current.filter((current) => current.id !== item.id));
  };

  return (
    <>
      <Stack direction="horizontal" gap={3}>
        <ResourceDisplay tooltip="Value (coins)" type="coins" value={getSellPrice(item)} />

        <Button onClick={handleSale} variant="outline-dark">
          Sell
        </Button>
      </Stack>
    </>
  );
}
