import { IconDisplay } from "@neverquest/components/IconDisplay";
import { TRAITS } from "@neverquest/data/traits";
import type { Trait } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function TraitDisplay({ trait }: { trait: Trait }) {
  const { description, Icon } = TRAITS[trait];
  const name = capitalizeAll(trait);

  return (
    <IconDisplay description={description} Icon={Icon} tooltip="Trait">
      {name}
    </IconDisplay>
  );
}
