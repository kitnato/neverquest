import { IconImage } from "@neverquest/components/IconImage";
import { ELEMENTALS, GEMS } from "@neverquest/data/items";
import type { Gem } from "@neverquest/types/unions";

export function GemDescription({ gem }: { gem: Gem }) {
  const { elemental } = GEMS[gem];
  const { color, damageModification, Icon } = ELEMENTALS[elemental];

  return (
    <div>
      <span>Adds elemental&nbsp;</span>

      <IconImage className="small" Icon={Icon} />

      <span className={color}>&nbsp;{elemental}&nbsp;</span>

      <span>effect & a</span>

      <span className="fst-italic">&nbsp;{damageModification}&nbsp;</span>

      <span>damage bonus to gear.</span>
    </div>
  );
}
