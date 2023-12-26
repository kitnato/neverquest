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
import { isAmmunitionPouch } from "@neverquest/types/type-guards";
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

  if (ownedAmmunitionPouch !== undefined && isAmmunitionPouch(ownedAmmunitionPouch)) {
    return (
      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay Icon={IconAmmunition} tooltip="Ammunition">
          Ammunition
        </IconDisplay>

        <Stack direction="horizontal" gap={3}>
          <IconDisplay Icon={IconEssence} tooltip="Price">
            {formatNumber({ value: totalPrice })}
          </IconDisplay>
          {(() => {
            const { current, ID, maximum } = ownedAmmunitionPouch;

            return (
              <OverlayTrigger
                overlay={
                  <Tooltip>
                    {!isAffordable && <div>{LABEL_NO_ESSENCE}</div>}

                    {isFull && <div>Pouch is full.</div>}
                  </Tooltip>
                }
                trigger={canPurchase ? [] : ["focus", "hover"]}
              >
                <div>
                  <Dropdown as={ButtonGroup}>
                    <Button
                      disabled={!canPurchase}
                      onClick={() => {
                        if (isAffordable && !isFull) {
                          transactEssence(-totalPrice);

                          setInventory((currentInventory) =>
                            currentInventory.map((currentItem) =>
                              currentItem.ID === ID && isAmmunitionPouch(currentItem)
                                ? {
                                    ...currentItem,
                                    current: currentItem.current + amount,
                                  }
                                : currentItem,
                            ),
                          );
                        }
                      }}
                      variant="outline-dark"
                    >
                      Purchase {formatNumber({ value: amount })}
                    </Button>

                    <DropdownToggle split variant="outline-dark" />

                    <DropdownMenu>
                      {[
                        { amount: 1, label: "1" },
                        { amount: 10, label: "10" },
                        { amount: maximum - current, label: LABEL_MAXIMUM },
                      ].map(({ amount, label }) => (
                        <DropdownItem
                          key={label}
                          onClick={() => {
                            setAmount(amount);
                          }}
                        >
                          <Stack direction="horizontal" gap={1}>
                            <IconImage className="small" Icon={IconAmmunition} />

                            {label}
                          </Stack>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </OverlayTrigger>
            );
          })()}
        </Stack>
      </div>
    );
  }
}
