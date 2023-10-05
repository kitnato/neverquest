import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconAmmunition } from "@neverquest/icons/ammunition.svg";
import { deltas } from "@neverquest/state/deltas";
import { ammunition } from "@neverquest/state/items";
import { formatValue } from "@neverquest/utilities/formatters";

export function Ammunition() {
  const ammunitionValue = useRecoilValue(ammunition);

  useDeltaText({
    delta: deltas("ammunition"),
    value: ammunition,
  });

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{formatValue({ value: ammunitionValue })}</span>

          <FloatingText delta="ammunition" />
        </Stack>
      }
      Icon={IconAmmunition}
      isAnimated
      tooltip="Ammunition"
    />
  );
}
