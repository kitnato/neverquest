import { Button, ButtonGroup, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { AMMUNITION_PRICE } from "@neverquest/data/caravan";
import { AMMUNITION_MAXIMUM } from "@neverquest/data/inventory";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconAmmunition } from "@neverquest/icons/ammunition.svg";
import { ammunition } from "@neverquest/state/inventory";
import { coins } from "@neverquest/state/resources";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_MAXIMUM } from "@neverquest/utilities/constants";

export function PurchaseAmmunition() {
  const [ammunitionValue, setAmmunitionValue] = useRecoilState(ammunition);
  const coinsValue = useRecoilValue(coins);

  const transactResources = useTransactResources();

  const amounts = [
    { amount: 1, label: "1" },
    { amount: 10, label: "10" },
    { amount: AMMUNITION_MAXIMUM - ammunitionValue, label: LABEL_MAXIMUM },
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
            {amounts.map(({ amount, label }) => (
              <Button
                disabled={!isAffordable(amount)}
                key={label}
                onClick={() => handlePurchase(amount)}
                variant="outline-dark"
              >
                {label}
              </Button>
            ))}
          </ButtonGroup>
        </Stack>
      </div>
    </Stack>
  );
}
