import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { Regeneration } from "@neverquest/components/Reserves/Regeneration";
import { StaminaMeter } from "@neverquest/components/Reserves/StaminaMeter";
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
            <StaminaMeter />

            <FloatingText deltaType="stamina" />
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
