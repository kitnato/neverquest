import IconDisplay from "@neverquest/components/IconDisplay";
import ReserveMeter from "@neverquest/components/ReserveMeter";
import { ReactComponent as Icon } from "@neverquest/icons/weight-crush.svg";
import { ReserveType } from "@neverquest/types/enums";

export default function () {
  return (
    <IconDisplay
      contents={<ReserveMeter type={ReserveType.Encumbrance} />}
      Icon={Icon}
      tooltip="Encumbrance"
    />
  );
}
