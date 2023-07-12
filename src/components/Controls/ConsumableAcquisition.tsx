import { useRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconAntidote } from "@neverquest/icons/antidote.svg";
import { ReactComponent as IconBandages } from "@neverquest/icons/bandages.svg";
import { ReactComponent as IconElixir } from "@neverquest/icons/elixir.svg";
import { ReactComponent as IconSalve } from "@neverquest/icons/salve.svg";
import { ReactComponent as IconSoulstone } from "@neverquest/icons/soulstone.svg";
import { consumablesAcquired } from "@neverquest/state/inventory";
import type { SVGIcon } from "@neverquest/types/props";
import type { Consumable } from "@neverquest/types/unions";
import { getAnimationClass } from "@neverquest/utilities/getters";

const ICONS: Record<Consumable, SVGIcon> = {
  antidote: IconAntidote,
  bandages: IconBandages,
  elixir: IconElixir,
  salve: IconSalve,
  soulstone: IconSoulstone,
};

export function ConsumableAcquisition() {
  const [consumablesAcquiredValue, setConsumablesAcquired] = useRecoilState(consumablesAcquired);

  const handleAnimationEnd = (id: string) => () =>
    setConsumablesAcquired((current) => current.filter(({ key }) => key !== id));

  if (consumablesAcquiredValue.length === 0) {
    return null;
  }

  return consumablesAcquiredValue.map(({ key, type }) => (
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
