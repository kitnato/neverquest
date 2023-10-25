import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconAmmunition from "@neverquest/icons/ammunition.svg?react";
import { ammunition } from "@neverquest/state/items";
import { formatNumber } from "@neverquest/utilities/formatters";

export function Ammunition() {
  const ammunitionValue = useRecoilValue(ammunition);

  useDeltaText({
    delta: "ammunition",
    value: ammunition,
  });

  return (
    <IconDisplay Icon={IconAmmunition} isAnimated tooltip="Ammunition">
      <Stack direction="horizontal">
        <span>{formatNumber({ value: ammunitionValue })}</span>

        <FloatingTextQueue delta="ammunition" />
      </Stack>
    </IconDisplay>
  );
}
