import IconDisplay from "@neverquest/components/IconDisplay";
import ShieldName from "@neverquest/components/Inventory/Shield/ShieldName";
import { ReactComponent as Icon } from "@neverquest/icons/round-shield.svg";
import { Shield } from "@neverquest/types";

export default function ({ shield }: { shield: Shield }) {
  return <IconDisplay Icon={Icon} contents={<ShieldName shield={shield} />} tooltip="Shield" />;
}
