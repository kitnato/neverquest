import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconAmmunition from "@neverquest/icons/ammunition.svg?react";
import { ammunition } from "@neverquest/state/items";
import { formatValue } from "@neverquest/utilities/formatters";

export function Ammunition() {
  const ammunitionValue = useRecoilValue(ammunition);

  useDeltaText({
    delta: "ammunition",
    value: ammunition,
  });

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{formatValue({ value: ammunitionValue })}</span>

          <FloatingTextQueue delta="ammunition" />
        </Stack>
      }
      Icon={IconAmmunition}
      isAnimated
      tooltip="Ammunition"
    />
  );
}
