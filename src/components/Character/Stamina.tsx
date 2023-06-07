import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Regeneration } from "@neverquest/components/Character/Regeneration";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ReserveMeter } from "@neverquest/components/ReserveMeter";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { isShowing } from "@neverquest/state/isShowing";

export function Stamina() {
  const isShowingStamina = useRecoilValue(isShowing("stamina"));

  if (!isShowingStamina) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack>
          <Stack className="w-100" direction="horizontal">
            <ReserveMeter attached="below" type="stamina" />

            <FloatingText deltaType="stamina" isRelative />
          </Stack>

          <Regeneration type="stamina" />
        </Stack>
      }
      Icon={IconStamina}
      isAnimated
      tooltip="Stamina"
    />
  );
}
