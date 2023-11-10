import { useState } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { AMMUNITION_PRICE } from "@neverquest/data/caravan";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_MAXIMUM,
  LABEL_NO_ESSENCE,
} from "@neverquest/data/general";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconAmmunition from "@neverquest/icons/ammunition.svg?react";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { inventory, ownedItem } from "@neverquest/state/inventory";
import { ammunition, ammunitionMaximum } from "@neverquest/state/items";
import { essence } from "@neverquest/state/resources";
import type { AmmunitionPouchItem } from "@neverquest/types";
import { formatNumber } from "@neverquest/utilities/formatters";

export function PurchaseAmmunition() {
  const ammunitionValue = useRecoilValue(ammunition);
  const ammunitionMaximumValue = useRecoilValue(ammunitionMaximum);
  const essenceValue = useRecoilValue(essence);
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));
  const setInventory = useSetRecoilState(inventory);

  const [amount, setAmount] = useState(1);

  const transactEssence = useTransactEssence();

  const totalPrice = AMMUNITION_PRICE * amount;
  const isAffordable = totalPrice <= essenceValue;
  const isFull = ammunitionValue >= ammunitionMaximumValue;
  const canPurchase = isAffordable && !isFull;

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay Icon={IconAmmunition} tooltip="Ammunition">
        Ammunition
      </IconDisplay>

      <Stack direction="horizontal" gap={3}>
        <IconDisplay Icon={IconEssence} tooltip="Price">
          {formatNumber({ value: totalPrice })}
        </IconDisplay>

        {ownedAmmunitionPouch === null ? (
          <span className="fst-italic">Nowhere to store ammunition.</span>
        ) : (
          (() => {
            const { current, maximum } = ownedAmmunitionPouch as AmmunitionPouchItem;

            return (
              <OverlayTrigger
                overlay={
                  <Tooltip>
                    {!isAffordable && <div>{LABEL_NO_ESSENCE}</div>}

                    {isFull && <div>Pouch is full.</div>}
                  </Tooltip>
                }
                trigger={canPurchase ? [] : ["hover", "focus"]}
              >
                <span>
                  <Dropdown as={ButtonGroup}>
                    <Button
                      disabled={!canPurchase}
                      onClick={() => {
                        if (isAffordable && !isFull && ownedAmmunitionPouch !== null) {
                          transactEssence(-totalPrice);

                          setInventory((currentInventory) =>
                            currentInventory.map((currentItem) =>
                              currentItem.ID === ownedAmmunitionPouch.ID
                                ? {
                                    ...currentItem,
                                    current: (currentItem as AmmunitionPouchItem).current + amount,
                                  }
                                : currentItem,
                            ),
                          );
                        }
                      }}
                      variant="outline-dark"
                    >
                      Purchase {amount}
                    </Button>

                    <DropdownToggle split variant="outline-dark" />

                    <DropdownMenu>
                      {[
                        { amount: 1, label: "1" },
                        { amount: 10, label: "10" },
                        { amount: maximum - current, label: LABEL_MAXIMUM },
                      ].map(({ amount, label }) => (
                        <DropdownItem key={label} onClick={() => setAmount(amount)}>
                          <Stack direction="horizontal" gap={1}>
                            <IconImage Icon={IconAmmunition} size="small" />

                            {label}
                          </Stack>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </span>
              </OverlayTrigger>
            );
          })()
        )}
      </Stack>
    </div>
  );
}
