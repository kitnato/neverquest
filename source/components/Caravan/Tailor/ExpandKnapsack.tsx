import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Encumbrance } from "@neverquest/components/Inventory/Encumbrance";
import { TAILORING } from "@neverquest/data/caravan";
import {
  CLASS_FULL_WIDTH_JUSTIFIED,
  LABEL_NO_ESSENCE,
  POPOVER_TRIGGER,
} from "@neverquest/data/general";
import { KNAPSACK_CAPACITY } from "@neverquest/data/items";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconTailoring from "@neverquest/icons/tailoring.svg?react";
import { knapsackCapacity } from "@neverquest/state/inventory";
import { essence } from "@neverquest/state/resources";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getFromRange, getSigmoid } from "@neverquest/utilities/getters";

export function ExpandKnapsack() {
  const [knapsackCapacityValue, setKnapsackCapacity] = useRecoilState(knapsackCapacity);
  const essenceValue = useRecoilValue(essence);

  const progressQuest = useProgressQuest();
  const transactEssence = useTransactEssence();

  const { amount, priceRange } = TAILORING.knapsack;

  const price = Math.ceil(
    getFromRange({
      factor: getSigmoid((knapsackCapacityValue - (KNAPSACK_CAPACITY - 1)) / amount),
      ...priceRange,
    }),
  );
  const isAffordable = price <= essenceValue;

  return (
    <Stack gap={3}>
      <h6>Knapsack</h6>

      <Encumbrance />

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay
          description={<span>{`Increases maximum encumbrance by ${amount}.`}</span>}
          Icon={IconTailoring}
          tooltip="Tailoring"
        >
          <span>Add pockets</span>
        </IconDisplay>

        <Stack className="ms-2" direction="horizontal" gap={3}>
          <IconDisplay Icon={IconEssence} tooltip="Price">
            <span>{formatNumber({ value: price })}</span>
          </IconDisplay>

          <OverlayTrigger
            overlay={
              <Tooltip>
                <span>{LABEL_NO_ESSENCE}</span>
              </Tooltip>
            }
            trigger={isAffordable ? [] : POPOVER_TRIGGER}
          >
            <div>
              <Button
                disabled={!isAffordable}
                onClick={() => {
                  transactEssence(-price);

                  setKnapsackCapacity(
                    (currentKnapsackCapacity) => currentKnapsackCapacity + amount,
                  );

                  progressQuest({
                    amount,
                    quest: "knapsackExpanding",
                  });
                }}
                variant="outline-dark"
              >
                <span>Expand</span>
              </Button>
            </div>
          </OverlayTrigger>
        </Stack>
      </div>
    </Stack>
  );
}
