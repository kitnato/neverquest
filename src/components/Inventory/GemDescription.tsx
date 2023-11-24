import { Stack } from "react-bootstrap";
import { IconImage } from "@neverquest/components/IconImage";
import { ELEMENTALS, GEM_ELEMENTALS } from "@neverquest/data/inventory";
import type { Gem } from "@neverquest/types/unions";

export function GemDescription({ name }: { name: Gem }) {
  const elemental = GEM_ELEMENTALS[name];
  const { color, Icon } = ELEMENTALS[elemental];

  return (
    <span>
      <Stack className="d-inline-flex text-center" direction="horizontal" gap={1}>
        Adds elemental
        <IconImage Icon={Icon} isSmall />
        <span className={color}>{elemental}</span>
      </Stack>{" "}
      effect to a weapon, shield or armor.
    </span>
  );
}
