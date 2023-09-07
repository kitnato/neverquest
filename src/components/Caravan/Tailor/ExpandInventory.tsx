import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { TAILORING_EXPANSION, TAILORING_MAXIMUM_PRICE } from "@neverquest/data/caravan";
import { ENCUMBRANCE } from "@neverquest/data/inventory";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { encumbranceMaximum, hasKnapsack } from "@neverquest/state/inventory";
import { coins } from "@neverquest/state/resources";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

export function ExpandInventory() {
  const coinsValue = useRecoilValue(coins);
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const [encumbranceMaximumValue, setEncumbranceMaximum] = useRecoilState(encumbranceMaximum);

  const transactResources = useTransactResources();

  const price = Math.ceil(
    TAILORING_MAXIMUM_PRICE * getGrowthSigmoid(encumbranceMaximumValue - (ENCUMBRANCE - 1)),
  );
  const isAffordable = price <= coinsValue;
  const canExpand = isAffordable && hasKnapsackValue;

  const handleExpansion = () => {
    transactResources({ coinsDifference: -price });
    setEncumbranceMaximum((current) => current + TAILORING_EXPANSION);
  };

  return (
    <Stack direction="horizontal" gap={3}>
      <ResourceDisplay tooltip="Price (coins)" type="coins" value={price} />

      <OverlayTrigger
        overlay={
          <Tooltip>
            {!hasKnapsackValue && <div>Knapsack required!</div>}
            {!isAffordable && <div>Not enough coins!</div>}
          </Tooltip>
        }
        trigger={canExpand ? [] : ["hover", "focus"]}
      >
        <span>
          <Button disabled={!canExpand} onClick={handleExpansion} variant="outline-dark">
            Expand
          </Button>
        </span>
      </OverlayTrigger>
    </Stack>
  );
}
