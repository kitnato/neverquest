import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { GemDescription } from "@neverquest/components/Inventory/GemDescription";
import { WeightDetail } from "@neverquest/components/Inventory/WeightDetail";
import type { ConsumableItem, GemItem, InheritableItem } from "@neverquest/types";
import { isGemItem, isRelicItem } from "@neverquest/types/type-guards";
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters";

export function ItemName({
  amount,
  item,
}: {
  amount?: number;
  item: ConsumableItem | GemItem | InheritableItem;
}) {
  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <PopoverBody className="text-center">
            <Stack gap={2}>
              {isGemItem(item) ? (
                <GemDescription gem={item.name} />
              ) : isRelicItem(item) && item.name === "[P71NQ]" ? (
                <Stack className="monospaced">
                  <span>Priority 0 - BREACH IN PROGRESS</span>

                  <span>Location: Outfloor ██-██#7</span>

                  <span>Initializing: CipherBrk-██-███</span>

                  <span>Processing: 7.7% ...</span>

                  <span>Error: Q██nt█m ██████ destabilization</span>

                  <span>LEAKAGE IMMINENT</span>
                </Stack>
              ) : (
                <span>{item.description}</span>
              )}

              <DetailsTable>
                <WeightDetail amount={amount} weight={item.weight} />
              </DetailsTable>
            </Stack>
          </PopoverBody>
        </Popover>
      }
      placement="right"
    >
      <span className="fitted">
        {capitalizeAll(item.name)}
        {amount !== undefined && amount > 1 ? ` ×${formatNumber({ value: amount })}` : ""}
        &nbsp;
      </span>
    </OverlayTrigger>
  );
}
