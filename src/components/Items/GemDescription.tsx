import { IconImage } from "@neverquest/components/IconImage";
import { ELEMENTALS, GEM_ELEMENTALS } from "@neverquest/data/inventory";
import type { Gem } from "@neverquest/types/unions";

export function GemDescription({ type }: { type: Gem }) {
  const elemental = GEM_ELEMENTALS[type];
  const { color, Icon } = ELEMENTALS[elemental];

  return (
    <>
      Adds elemental&nbsp;
      <IconImage Icon={Icon} size="tiny" />
      &nbsp;<span className={color}>{elemental}</span> effect to a weapon, shield, or armor.
    </>
  );
}
