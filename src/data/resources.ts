import type { RecoilState } from "recoil";

import { ReactComponent as IconCoins } from "@neverquest/icons/coins.svg";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { ReactComponent as IconScrap } from "@neverquest/icons/scrap.svg";
import {
  coins,
  coinsLoot,
  essence,
  essenceLoot,
  scrap,
  scrapLoot,
} from "@neverquest/state/resources";
import type { SVGIcon } from "@neverquest/types/props";
import type { Delta, Resource, Showing } from "@neverquest/types/unions";

export const LOOTING_RATE = 3000;

export const RESOURCES: Record<
  Resource,
  {
    atom: RecoilState<number>;
    atomLoot: RecoilState<number>;
    delta: Delta;
    deltaLoot: Delta;
    Icon: SVGIcon;
    showing: Showing;
  }
> = {
  coins: {
    atom: coins,
    atomLoot: coinsLoot,
    delta: "coins",
    deltaLoot: "coinsLoot",
    Icon: IconCoins,
    showing: "coins",
  },
  essence: {
    atom: essence,
    atomLoot: essenceLoot,
    delta: "essence",
    deltaLoot: "essenceLoot",
    Icon: IconEssence,
    showing: "essence",
  },
  scrap: {
    atom: scrap,
    atomLoot: scrapLoot,
    delta: "scrap",
    deltaLoot: "scrapLoot",
    Icon: IconScrap,
    showing: "scrap",
  },
};
