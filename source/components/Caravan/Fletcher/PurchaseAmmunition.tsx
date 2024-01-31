import { useEffect } from "react";
import { Button, Form, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { FLETCHING } from "@neverquest/data/caravan";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_MAXIMUM,
  LABEL_NO_ESSENCE,
  POPOVER_TRIGGER,
} from "@neverquest/data/general";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconAmmunition from "@neverquest/icons/ammunition.svg?react";
import IconEssence from "@neverquest/icons/essence.svg?react";
import { fletcherOptions } from "@neverquest/state/caravan";
import { ammunition, ammunitionCapacity } from "@neverquest/state/items";
import { essence } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";

export function PurchaseAmmunition() {
  const [ammunitionValue, setAmmunition] = useRecoilState(ammunition);
  const [{ ammunition: ammunitionAmount }, setFletcherOptions] = useRecoilState(fletcherOptions);
  const ammunitionCapacityValue = useRecoilValue(ammunitionCapacity);
  const essenceValue = useRecoilValue(essence);

  const transactEssence = useTransactEssence();

  const { ammunitionPrice, minimumPurchase } = FLETCHING;
  const maximumAffordable = Math.min(
    Math.floor(essenceValue / ammunitionPrice),
    ammunitionCapacityValue - ammunitionValue,
  );
  const totalPrice = ammunitionPrice * ammunitionAmount;
  const isAffordable = totalPrice <= essenceValue;
  const isFull = ammunitionValue >= ammunitionCapacityValue;
  const canPurchase = isAffordable && !isFull;

  useEffect(() => {
    if (ammunitionAmount === 0 || ammunitionAmount > maximumAffordable) {
      setFletcherOptions((options) => ({
        ...options,
        ammunition: maximumAffordable,
      }));
    }
  }, [ammunitionAmount, maximumAffordable, setFletcherOptions]);

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <Stack direction="horizontal" gap={3}>
        <IconDisplay Icon={IconAmmunition} tooltip="Ammunition">
          <span>Ammunition</span>
        </IconDisplay>

        <span>{minimumPurchase}</span>

        <Form.Range
          disabled={isFull}
          max={maximumAffordable}
          min={minimumPurchase}
          onChange={({ target: { value } }) => {
            if (!value) {
              return;
            }

            const parsedValue = Number.parseInt(value);

            if (Number.isNaN(parsedValue) || parsedValue < 1 || parsedValue > maximumAffordable) {
              return;
            }

            setFletcherOptions((options) => ({
              ...options,
              ammunition: parsedValue,
            }));
          }}
          value={ammunitionAmount}
        />

        <span>{LABEL_MAXIMUM}</span>
      </Stack>

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
            <Button
              disabled={!canPurchase}
              onClick={() => {
                if (isAffordable && !isFull) {
                  transactEssence(-totalPrice);

                  setAmmunition((currentAmmunition) => currentAmmunition + ammunitionAmount);
                }
              }}
              variant="outline-dark"
            >
              <span>Purchase&nbsp;</span>

              <IconImage className="small" Icon={IconAmmunition} />

              <span>&nbsp;{formatNumber({ value: ammunitionAmount })}</span>
            </Button>
          </div>
        </OverlayTrigger>
      </Stack>
    </div>
  );
}
