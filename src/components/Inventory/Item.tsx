import { OverlayTrigger, Popover } from "react-bootstrap";

import IconDisplay from "@neverquest/components/IconDisplay";
import {
  ITEM_COMPASS,
  ITEM_HEARTHSTONE,
  ITEM_KNAPSACK,
  ITEM_LODESTONE,
} from "@neverquest/constants/items";
import { Item } from "@neverquest/types";

export default function ({ item }: { item: Item }) {
  const { description, Icon, name } = item;
  let IconLookup = Icon;

  // SVGIcon cannot be stringified for localStorage, so look it up again from source.
  if (IconLookup == undefined) {
    switch (name) {
      case ITEM_COMPASS.name:
        IconLookup = ITEM_COMPASS.Icon;
        break;
      case ITEM_HEARTHSTONE.name:
        IconLookup = ITEM_HEARTHSTONE.Icon;
        break;
      case ITEM_LODESTONE.name:
        IconLookup = ITEM_LODESTONE.Icon;
        break;
      case ITEM_KNAPSACK.name:
        IconLookup = ITEM_KNAPSACK.Icon;
        break;
    }
  }

  return (
    <IconDisplay
      contents={
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header className="text-center">{name}</Popover.Header>

              <Popover.Body>
                <span className="fst-italic">{description}</span>
              </Popover.Body>
            </Popover>
          }
          placement="top"
        >
          <span>{name}</span>
        </OverlayTrigger>
      }
      Icon={IconLookup}
      tooltip="Item"
    />
  );
}
