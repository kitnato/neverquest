import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ELEMENTALS, GEMS_MAXIMUM, GEM_ELEMENTALS } from "@neverquest/data/inventory";
import { ReactComponent as IconGem } from "@neverquest/icons/gem.svg";
import { shield } from "@neverquest/state/inventory";
import { shieldElementalEffects } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";
import { stackItems } from "@neverquest/utilities/helpers";

export function AppliedGemsShield() {
  const { gems } = useRecoilValue(shield);
  const shieldElementalEffectsValue = useRecoilValue(shieldElementalEffects);

  const appliedGems = gems.length;

  if (appliedGems === 0) {
    return null;
  }

  return (
    <tr>
      <td className={CLASS_TABLE_CELL_ITALIC}>{`Gems (${appliedGems}/${GEMS_MAXIMUM}):`}</td>

      <td>
        {stackItems(gems.slice().sort((a, b) => a.type.localeCompare(b.type))).map(
          ({ item, stack }) => {
            const { id, type } = item;
            const elemental = GEM_ELEMENTALS[type];
            const enhancement = formatPercentage(shieldElementalEffectsValue[elemental], 0);

            return (
              <div key={id}>
                <span className={ELEMENTALS[elemental].color}>{`+${enhancement}`}</span>
                {" · "}
                <IconImage Icon={ELEMENTALS[elemental].Icon} size="tiny" />
                {` +${enhancement} · `}
                <IconImage Icon={IconGem} size="tiny" />
                &nbsp;
                {stack}
              </div>
            );
          },
        )}
      </td>
    </tr>
  );
}
