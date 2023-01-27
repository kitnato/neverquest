import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ShieldName } from "@neverquest/components/Inventory/Shield/ShieldName";
import { ReactComponent as Icon } from "@neverquest/icons/round-shield.svg";
import { Shield } from "@neverquest/types";

export function ShieldDisplay({ shield }: { shield: Shield }) {
  return <IconDisplay contents={<ShieldName shield={shield} />} Icon={Icon} tooltip="Shield" />;
}
