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
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { AMMUNITION_PRICE } from "@neverquest/data/caravan";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_MAXIMUM,
  LABEL_NO_ESSENCE,
  POPOVER_TRIGGER,
} from "@neverquest/data/general";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconAmmunition from "@neverquest/icons/ammunition.svg?react";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { ammunition, ammunitionCapacity } from "@neverquest/state/items";
import { essence } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";

export function PurchaseAmmunition() {
  const [ammunitionValue, setAmmunition] = useRecoilState(ammunition);
  const ammunitionCapacityValue = useRecoilValue(ammunitionCapacity);
  const essenceValue = useRecoilValue(essence);

  const maximumAffordable = Math.min(
    Math.floor(essenceValue / AMMUNITION_PRICE),
    ammunitionCapacityValue - ammunitionValue,
  );

  const [amount, setAmount] = useState(maximumAffordable);

  const transactEssence = useTransactEssence();

  const totalPrice = AMMUNITION_PRICE * amount;
  const isAffordable = totalPrice <= essenceValue;
  const isFull = ammunitionValue >= ammunitionCapacityValue;
  const canPurchase = isAffordable && !isFull;

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay Icon={IconAmmunition} tooltip="Ammunition">
        <span>Ammunition</span>
      </IconDisplay>

      <Stack className="ms-2" direction="horizontal" gap={3}>
        <IconDisplay Icon={IconEssence} tooltip="Price">
          <span>{formatNumber({ value: totalPrice })}</span>
        </IconDisplay>

        <OverlayTrigger
          overlay={
            <Tooltip>
              <Stack>
                {!isAffordable && <span>{LABEL_NO_ESSENCE}</span>}

                {isFull && <span>Ammunition pouch is full.</span>}
              </Stack>
            </Tooltip>
          }
          show={canPurchase ? false : undefined}
          trigger={canPurchase ? [] : POPOVER_TRIGGER}
        >
          <div>
            <Dropdown as={ButtonGroup}>
              <Button
                disabled={!canPurchase}
                onClick={() => {
                  if (isAffordable && !isFull) {
                    transactEssence(-totalPrice);

                    setAmmunition((currentAmmunition) => currentAmmunition + amount);
                  }
                }}
                variant="outline-dark"
              >
                Purchase {formatNumber({ value: amount })}
              </Button>

              <DropdownToggle split variant="outline-dark" />

              <DropdownMenu>
                {[
                  { amount: maximumAffordable, label: LABEL_MAXIMUM },
                  { amount: 1, label: "1" },
                  { amount: 10, label: "10" },
                  { amount: 10, label: "25" },
                  { amount: 50, label: "50" },
                  { amount: 100, label: "100" },
                ].map(({ amount, label }) => (
                  <DropdownItem
                    key={label}
                    onClick={() => {
                      setAmount(amount);
                    }}
                  >
                    <IconDisplay Icon={IconAmmunition} iconProps={{ className: "small" }}>
                      <span>{label}</span>
                    </IconDisplay>
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </OverlayTrigger>
      </Stack>
    </div>
  );
}
