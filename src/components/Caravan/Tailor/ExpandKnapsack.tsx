import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { TAILORING_EXPANSION, TAILORING_PRICES_MAXIMUM } from "@neverquest/data/caravan";
import { ENCUMBRANCE } from "@neverquest/data/inventory";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconTailoring } from "@neverquest/icons/tailoring.svg";
import { encumbranceMaximum, hasKnapsack } from "@neverquest/state/inventory";
import { coins } from "@neverquest/state/resources";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

export function ExpandKnapsack() {
  const coinsValue = useRecoilValue(coins);
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const [encumbranceMaximumValue, setEncumbranceMaximum] = useRecoilState(encumbranceMaximum);

  const transactResources = useTransactResources();

  const price = Math.ceil(
    TAILORING_PRICES_MAXIMUM.knapsack *
      getGrowthSigmoid(encumbranceMaximumValue - (ENCUMBRANCE - 1)),
  );
  const isAffordable = price <= coinsValue;
  const canExpand = isAffordable && hasKnapsackValue;

  const handleExpansion = () => {
    transactResources({ coinsDifference: -price });
    setEncumbranceMaximum((current) => current + TAILORING_EXPANSION.knapsack);
  };

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay
        contents="Add pockets"
        description={`Increases maximum encumbrance by ${TAILORING_EXPANSION.knapsack}.`}
        Icon={IconTailoring}
        tooltip="Tailoring"
      />

      <Stack direction="horizontal" gap={3}>
        <ResourceDisplay tooltip="Price (coins)" type="coins" value={price} />

        <OverlayTrigger
          overlay={
            <Tooltip>
              {!hasKnapsackValue && <div>Knapsack required!</div>}
              {!isAffordable && <div>Insufficient coins!</div>}
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
    </div>
  );
}
