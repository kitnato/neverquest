import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import { TAILORING_EXPANSION, TAILORING_PRICES_MAXIMUM } from "@neverquest/data/caravan";
import { AMMUNITION_MAXIMUM } from "@neverquest/data/inventory";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as IconTailoring } from "@neverquest/icons/tailoring.svg";
import { ammunitionMaximum } from "@neverquest/state/inventory";
import { coins } from "@neverquest/state/resources";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

export function ExpandAmmunitionPouch() {
  const coinsValue = useRecoilValue(coins);
  const [ammunitionMaximumValue, setAmmunitionMaximum] = useRecoilState(ammunitionMaximum);

  const transactResources = useTransactResources();

  const price = Math.ceil(
    TAILORING_PRICES_MAXIMUM.ammunitionPouch *
      getGrowthSigmoid(ammunitionMaximumValue - (AMMUNITION_MAXIMUM - 1)),
  );
  const isAffordable = price <= coinsValue;

  const handleExpansion = () => {
    transactResources({ coinsDifference: -price });
    setAmmunitionMaximum((current) => current + TAILORING_EXPANSION.ammunitionPouch);
  };

  return (
    <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
      <IconDisplay
        contents="Add quiver"
        description={`Increases maximum ammunition by ${TAILORING_EXPANSION.ammunitionPouch}.`}
        Icon={IconTailoring}
        tooltip="Tailoring"
      />

      <Stack direction="horizontal" gap={3}>
        <ResourceDisplay tooltip="Price (coins)" type="coins" value={price} />

        <OverlayTrigger
          overlay={<Tooltip>Not enough coins!</Tooltip>}
          trigger={isAffordable ? [] : ["hover", "focus"]}
        >
          <span>
            <Button disabled={!isAffordable} onClick={handleExpansion} variant="outline-dark">
              Expand
            </Button>
          </span>
        </OverlayTrigger>
      </Stack>
    </div>
  );
}
