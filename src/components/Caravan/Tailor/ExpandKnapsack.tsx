import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Encumbrance } from "@neverquest/components/Inventory/Encumbrance";
import { TAILORING_EXPANSION, TAILORING_PRICE_MAXIMUM } from "@neverquest/data/caravan";
import { CLASS_FULL_WIDTH_JUSTIFIED, LABEL_NO_ESSENCE } from "@neverquest/data/general";
import { ENCUMBRANCE_CAPACITY } from "@neverquest/data/inventory";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import IconEssence from "@neverquest/icons/essence.svg?react";
import IconTailoring from "@neverquest/icons/tailoring.svg?react";
import { inventory, ownedItem } from "@neverquest/state/inventory";
import { essence } from "@neverquest/state/resources";
import type { KnapsackItem } from "@neverquest/types";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getGrowthSigmoid } from "@neverquest/utilities/getters";

export function ExpandKnapsack() {
  const essenceValue = useRecoilValue(essence);
  const ownedItemKnapsack = useRecoilValue(ownedItem("knapsack"));
  const setInventory = useSetRecoilState(inventory);

  const progressQuest = useProgressQuest();
  const transactEssence = useTransactEssence();

  if (ownedItemKnapsack === null) {
    return null;
  }

  const { capacity, id } = ownedItemKnapsack as KnapsackItem;
  const price = Math.ceil(
    TAILORING_PRICE_MAXIMUM.knapsack * getGrowthSigmoid(capacity - (ENCUMBRANCE_CAPACITY - 1)),
  );
  const isAffordable = price <= essenceValue;
  const canExpand = isAffordable && ownedItemKnapsack !== null;

  return (
    <Stack gap={3}>
      <h6>Knapsack</h6>

      <Encumbrance />

      <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
        <IconDisplay
          description={`Increases maximum encumbrance by ${TAILORING_EXPANSION.knapsack}.`}
          Icon={IconTailoring}
          tooltip="Tailoring"
        >
          Add pockets
        </IconDisplay>

        <Stack direction="horizontal" gap={3}>
          <IconDisplay Icon={IconEssence} tooltip="Price">
            {formatNumber({ value: price })}
          </IconDisplay>

          <OverlayTrigger
            overlay={
              <Tooltip>
                {ownedItemKnapsack === null && <div>Knapsack required.</div>}

                {!isAffordable && <div>{LABEL_NO_ESSENCE}</div>}
              </Tooltip>
            }
            trigger={canExpand ? [] : ["hover", "focus"]}
          >
            <span>
              <Button
                disabled={!canExpand}
                onClick={() => {
                  transactEssence(-price);
                  setInventory((currentInventory) =>
                    currentInventory.map((currentItem) =>
                      currentItem.id === id
                        ? {
                            ...currentItem,
                            capacity:
                              (currentItem as KnapsackItem).capacity + TAILORING_EXPANSION.knapsack,
                          }
                        : currentItem,
                    ),
                  );
                  progressQuest({
                    amount: TAILORING_EXPANSION.knapsack,
                    quest: "knapsackExpanding",
                  });
                }}
                variant="outline-dark"
              >
                Expand
              </Button>
            </span>
          </OverlayTrigger>
        </Stack>
      </div>
    </Stack>
  );
}
