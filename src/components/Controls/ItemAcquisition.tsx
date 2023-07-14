import { useRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconAntidote } from "@neverquest/icons/antidote.svg";
import { ReactComponent as IconArmor } from "@neverquest/icons/armor.svg";
import { ReactComponent as IconBandages } from "@neverquest/icons/bandages.svg";
import { ReactComponent as IconElixir } from "@neverquest/icons/elixir.svg";
import { ReactComponent as IconSalve } from "@neverquest/icons/salve.svg";
import { ReactComponent as IconShield } from "@neverquest/icons/shield.svg";
import { ReactComponent as IconSoulstone } from "@neverquest/icons/soulstone.svg";
import { ReactComponent as IconWeapon } from "@neverquest/icons/weapon.svg";
import { itemsAcquired } from "@neverquest/state/inventory";
import type { SVGIcon } from "@neverquest/types/props";
import type { Consumable, Gear } from "@neverquest/types/unions";
import { getAnimationClass } from "@neverquest/utilities/getters";

const ICONS: Record<Consumable | Gear, SVGIcon> = {
  antidote: IconAntidote,
  armor: IconArmor,
  bandages: IconBandages,
  elixir: IconElixir,
  salve: IconSalve,
  shield: IconShield,
  soulstone: IconSoulstone,
  weapon: IconWeapon,
};

export function ItemAcquisition() {
  const [itemsAcquiredValue, setItemsAcquired] = useRecoilState(itemsAcquired);

  const handleAnimationEnd = (id: string) => () =>
    setItemsAcquired((current) => current.filter(({ key }) => key !== id));

  if (itemsAcquiredValue.length === 0) {
    return null;
  }

  return itemsAcquiredValue.map(({ key, type }) => (
    <div
      className={`position-absolute ${getAnimationClass({ speed: "slower", type: "zoomOut" })}`}
      key={key}
      onAnimationEnd={handleAnimationEnd(key)}
      style={{ left: -12, top: 12 }}
    >
      <IconImage Icon={ICONS[type]} size="small" />
    </div>
  ));
}
