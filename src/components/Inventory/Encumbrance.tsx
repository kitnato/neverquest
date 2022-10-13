import IconDisplay from "@neverquest/components/IconDisplay";
import ReserveMeter from "@neverquest/components/ReserveMeter";
import { ReactComponent as Icon } from "@neverquest/icons/weight-crush.svg";
import { encumbrance, encumbranceMaximum } from "@neverquest/state/inventory";

export default function () {
  return (
    <IconDisplay
      contents={<ReserveMeter atom={encumbrance} atomMaximum={encumbranceMaximum} />}
      Icon={Icon}
      tooltip="Encumbrance"
    />
  );
}
