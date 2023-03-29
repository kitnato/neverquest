import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ICON_ESSENCE } from "@neverquest/constants";
import { LootProps } from "@neverquest/types/props";

export function Essence({ tooltip, value }: LootProps) {
  return <IconDisplay contents={value} Icon={ICON_ESSENCE} tooltip={tooltip || "Essence"} />;
}
