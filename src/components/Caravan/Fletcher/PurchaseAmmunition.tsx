import { Button, ButtonGroup, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { AMMUNITION_PRICE } from "@neverquest/data/caravan";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconAmmunition } from "@neverquest/icons/ammunition.svg";
import { ammunition, ammunitionMaximum, hasItem } from "@neverquest/state/inventory";
import { coins } from "@neverquest/state/resources";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_MAXIMUM } from "@neverquest/utilities/constants";

export function PurchaseAmmunition() {
  const [ammunitionValue, setAmmunitionValue] = useRecoilState(ammunition);
  const ammunitionMaximumValue = useRecoilValue(ammunitionMaximum);
  const coinsValue = useRecoilValue(coins);
  const hasAmmunitionPouch = useRecoilValue(hasItem("ammunition pouch"));

  const transactResources = useTransactResources();

  const amounts = [
    { amount: 1, label: "1" },
    { amount: 10, label: "10" },
    { amount: ammunitionMaximumValue - ammunitionValue, label: LABEL_MAXIMUM },
  ];
  const isAffordable = (amount: number) => AMMUNITION_PRICE * amount <= coinsValue;

  const handlePurchase = (amount: number) => {
    if (isAffordable(amount)) {
      transactResources({ coinsDifference: -AMMUNITION_PRICE * amount });
      setAmmunitionValue((current) => current + amount);
    }
  };

  return (
    <Stack gap={3}>
      <h6>Purchase ammunition</h6>

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay contents="Ammunition (each)" Icon={IconAmmunition} tooltip="Ammunition" />

        <Stack direction="horizontal" gap={3}>
          <ResourceDisplay tooltip="Price (coins)" type="coins" value={AMMUNITION_PRICE} />

          <ButtonGroup>
            {amounts.map(({ amount, label }) => {
              const isQuantityAffordable = isAffordable(amount);
              const canPurchase = isQuantityAffordable && hasAmmunitionPouch;

              return (
                <OverlayTrigger
                  key={label}
                  overlay={
                    <Tooltip>
                      {!hasAmmunitionPouch && <div>Cannot store ammunition!</div>}
                      {!isQuantityAffordable && <div>Not enough coins!</div>}
                    </Tooltip>
                  }
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
        </Stack>
      </div>
    </Stack>
  );
}
