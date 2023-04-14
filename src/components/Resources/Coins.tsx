import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconCoins } from "@neverquest/icons/two-coins.svg";
import type { LootProps } from "@neverquest/types/props";

export function Coins({ tooltip, value }: LootProps) {
  return <IconDisplay contents={value} Icon={IconCoins} tooltip={tooltip ?? "Coins"} />;
}
