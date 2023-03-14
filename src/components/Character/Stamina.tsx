import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Regeneration } from "@neverquest/components/Character/Regeneration";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReserveMeter } from "@neverquest/components/ReserveMeter";
import { ReactComponent as IconStamina } from "@neverquest/icons/lungs.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { DeltaType, ReserveType, ShowingType } from "@neverquest/types/enums";
import { UIAttachment } from "@neverquest/types/ui";

export function Stamina() {
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

            <FloatingText type={DeltaType.Stamina} />
          </Stack>

          <Regeneration type={ReserveType.Stamina} />
        </Stack>
      }
      Icon={IconStamina}
      isAnimated
      tooltip="Stamina"
    />
  );
}
