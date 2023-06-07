import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReserveMeter } from "@neverquest/components/ReserveMeter";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";

export function Encumbrance() {
  return (
    <IconDisplay
      contents={<ReserveMeter type="encumbrance" />}
      Icon={IconEncumbrance}
      tooltip="Encumbrance"
    />
  );
}
