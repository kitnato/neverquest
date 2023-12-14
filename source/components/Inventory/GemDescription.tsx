import { Stack } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import { ELEMENTALS, GEMS } from "@neverquest/data/items";
import type { Gem } from "@neverquest/types/unions";

export function GemDescription({ gem }: { gem: Gem }) {
  const { damageModification, elemental } = GEMS[gem];
  const { color, Icon } = ELEMENTALS[elemental];

  return (
    <div>
      <Stack className="d-inline-flex text-center" direction="horizontal" gap={1}>
        Adds elemental
        <IconImage className="small" Icon={Icon} />
        <span className={color}>{elemental}</span>
      </Stack>{" "}
      effect & a {damageModification} damage bonus to gear.
    </div>
  );
}
