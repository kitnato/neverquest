import { OverlayTrigger, Popover } from "react-bootstrap";
import type { Placement } from "react-bootstrap/esm/types";

import { IconImage } from "../IconImage";
import { DetailsTable } from "@neverquest/components/DetailsTable";
import { WeightDetail } from "@neverquest/components/Items/WeightDetail";
import { ELEMENTALS } from "@neverquest/data/inventory";
import type { ConsumableItem, ShardItem, TrinketItem } from "@neverquest/types";
import { isShard } from "@neverquest/types/type-guards";
import type { Elemental } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

const ShardDescription = ({ type }: { type: Elemental }) => {
  const { color, Icon } = ELEMENTALS[type];

  return (
    <>
      Adds elemental&nbsp;
      <IconImage Icon={Icon} size="tiny" />
      &nbsp;<span className={color}>{type}</span> effect to a weapon, shield, or armor.
    </>
  );
};

export function ItemName({
  item,
  placement,
  stack,
}: {
  item: ConsumableItem | ShardItem | TrinketItem;
  placement?: Placement;
  stack?: number;
}) {
  const { type, weight } = item;
  const description = isShard(item) ? <ShardDescription type={item.type} /> : item.description;
  const name = isShard(item)
    ? `${capitalizeAll(ELEMENTALS[item.type].shard)} shard`
    : capitalizeAll(type);

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header className="text-center">{name}</Popover.Header>

          <Popover.Body className="text-center">
            <span>{description}</span>

            <DetailsTable>
              <WeightDetail stack={stack} weight={weight} />
            </DetailsTable>
          </Popover.Body>
        </Popover>
      }
      placement={placement}
    >
      <span>{`${name}${stack !== undefined && stack > 1 ? ` x${stack}` : ""}`}</span>
    </OverlayTrigger>
  );
}
