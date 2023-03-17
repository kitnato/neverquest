import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReserveMeter } from "@neverquest/components/ReserveMeter";
import { ICON_WEIGHT } from "@neverquest/constants";
import { ReserveType } from "@neverquest/types/enums";

export function Encumbrance() {
  return (
    <IconDisplay
      contents={<ReserveMeter type={ReserveType.Encumbrance} />}
      Icon={ICON_WEIGHT}
      tooltip="Encumbrance"
    />
  );
}
