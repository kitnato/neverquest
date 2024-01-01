import { Stack } from "react-bootstrap";
import { IconImage } from "@neverquest/components/IconImage";
import { ELEMENTALS, GEMS } from "@neverquest/data/items";
import type { Gem } from "@neverquest/types/unions";

export function GemDescription({ gem }: { gem: Gem }) {
  const { elemental } = GEMS[gem];
  const { color, damageModification, Icon } = ELEMENTALS[elemental];

  return (
    <Stack gap={1}>
      <div>
        <span>Adds elemental&nbsp;</span>

        <IconImage className="small" Icon={Icon} />

        <span className={color}>&nbsp;{elemental}</span>

        <span>&nbsp;effect to gear.</span>
      </div>

      <div>
        <span>In weapons/armor, provides a</span>

        <span className="fst-italic">&nbsp;{damageModification}&nbsp;</span>

        <span>damage/thorns bonus.</span>
      </div>

      <div>
        <span>{`In shields, enhances the elemental effect for all socketed ${gem} gems.`}</span>
      </div>
    </Stack>
  );
}
