import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconScrap } from "@neverquest/icons/shattered-sword.svg";
import type { LootProps } from "@neverquest/types/props";

export function Scrap({ tooltip, value }: LootProps) {
  return <IconDisplay contents={value} Icon={IconScrap} tooltip={tooltip ?? "Scrap"} />;
}
