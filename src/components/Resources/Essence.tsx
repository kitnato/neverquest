import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReactComponent as IconEssence } from "@neverquest/icons/incense.svg";
import { LootProps } from "@neverquest/types/props";

export function Essence({ tooltip, value }: LootProps) {
  return <IconDisplay contents={value} Icon={IconEssence} tooltip={tooltip || "Essence"} />;
}
