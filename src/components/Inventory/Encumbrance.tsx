import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReserveMeter } from "@neverquest/components/ReserveMeter";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { ReserveType } from "@neverquest/types/enums";

export function Encumbrance() {
  return (
    <IconDisplay
      contents={<ReserveMeter type={ReserveType.Encumbrance} />}
      Icon={IconEncumbrance}
      tooltip="Encumbrance"
    />
  );
}
