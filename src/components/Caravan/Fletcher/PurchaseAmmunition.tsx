import { Button, ButtonGroup, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { AMMUNITION_PRICE } from "@neverquest/data/caravan";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconAmmunition } from "@neverquest/icons/ammunition.svg";
import { inventory } from "@neverquest/state/inventory";
import { ownedItem } from "@neverquest/state/items";
import { coins } from "@neverquest/state/resources";
import type { TrinketItemAmmunitionPouch } from "@neverquest/types";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_MAXIMUM } from "@neverquest/utilities/constants";

export function PurchaseAmmunition() {
  const coinsValue = useRecoilValue(coins);
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));
  const setInventory = useSetRecoilState(inventory);

  const transactResources = useTransactResources();
  const isAffordable = (amount: number) => AMMUNITION_PRICE * amount <= coinsValue;

  const handlePurchase = (amount: number) => {
    if (isAffordable(amount) && ownedAmmunitionPouch !== null) {
      transactResources({ coinsDifference: -AMMUNITION_PRICE * amount });
      setInventory((currentInventory) =>
        currentInventory.map((currentItem) =>
          currentItem.id === ownedAmmunitionPouch.id
            ? {
                ...currentItem,
                current: (currentItem as TrinketItemAmmunitionPouch).current + amount,
              }
            : currentItem,
        ),
      );
    }
  };

  return (
    <Stack gap={3}>
      <h6>Purchase ammunition</h6>

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay contents="Ammunition (each)" Icon={IconAmmunition} tooltip="Ammunition" />

        <Stack direction="horizontal" gap={3}>
          <ResourceDisplay tooltip="Price (coins)" type="coins" value={AMMUNITION_PRICE} />

          {ownedAmmunitionPouch === null ? (
            <span className="fst-italic">Nowhere to store ammunition.</span>
          ) : (
            (() => {
              const { current, maximum } = ownedAmmunitionPouch as TrinketItemAmmunitionPouch;

              return (
                <ButtonGroup>
                  {[
                    { amount: 1, label: "1" },
                    { amount: 10, label: "10" },
                    { amount: maximum - current, label: LABEL_MAXIMUM },
                  ].map(({ amount, label }) => {
                    const canPurchase = isAffordable(amount);

                    return (
                      <OverlayTrigger
                        key={label}
                        overlay={<Tooltip>Not enough coins!</Tooltip>}
                        trigger={canPurchase ? [] : ["hover", "focus"]}
                      >
                        <span>
                          <Button
                            disabled={!canPurchase}
                            onClick={() => handlePurchase(amount)}
                            variant="outline-dark"
                          >
                            {label}
                          </Button>
                        </span>
                      </OverlayTrigger>
                    );
                  })}
                </ButtonGroup>
              );
            })()
          )}
        </Stack>
      </div>
    </Stack>
  );
}
