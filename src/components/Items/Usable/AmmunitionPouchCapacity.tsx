import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconAmmunitionPouch } from "@neverquest/icons/ammunition-pouch.svg";
import { deltas } from "@neverquest/state/deltas";
import { ammunition, ammunitionMaximum } from "@neverquest/state/items";

export function AmmunitionPouchCapacity() {
  const ammunitionValue = useRecoilValue(ammunition);
  const ammunitionMaximumValue = useRecoilValue(ammunitionMaximum);

  useDeltaText({
    delta: deltas("ammunitionMaximum"),
    value: ammunitionMaximum,
  });

  return (
    <Stack direction="horizontal">
      <IconDisplay contents="" Icon={IconAmmunitionPouch} tooltip="Ammunition pouch capacity" />

      <LabelledProgressBar
        label={
          <Stack direction="horizontal">
            {`${ammunitionValue}/${ammunitionMaximumValue}`}

            <FloatingText delta="ammunitionMaximum" />
          </Stack>
        }
        value={(ammunitionValue / ammunitionMaximumValue) * 100}
        variant="dark"
      />
    </Stack>
  );
}
