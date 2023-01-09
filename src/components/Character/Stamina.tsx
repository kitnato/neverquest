import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import Regeneration from "@neverquest/components/Character/Regeneration";
import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import ReserveMeter from "@neverquest/components/ReserveMeter";
import { ReactComponent as Icon } from "@neverquest/icons/lungs.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { DeltaType, ReserveType, ShowingType } from "@neverquest/types/enums";
import { UIAttachment } from "@neverquest/types/ui";

export default function () {
  const isShowingStamina = useRecoilValue(isShowing(ShowingType.Stamina));

  if (!isShowingStamina) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack>
          <Stack className="w-100" direction="horizontal">
            <ReserveMeter attached={UIAttachment.Below} type={ReserveType.Stamina} />

            <FloatingText atom={deltas(DeltaType.Stamina)} />
          </Stack>

          <Regeneration type={ReserveType.Stamina} />
        </Stack>
      }
      Icon={Icon}
      isAnimated
      tooltip="Stamina"
    />
  );
}
