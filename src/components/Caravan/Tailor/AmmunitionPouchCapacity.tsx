import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconAmmunitionPouch } from "@neverquest/icons/ammunition-pouch.svg";
import { ammunition, ammunitionMaximum } from "@neverquest/state/items";

export function AmmunitionPouchCapacity() {
  const ammunitionValue = useRecoilValue(ammunition);
  const ammunitionMaximumValue = useRecoilValue(ammunitionMaximum);

  useDeltaText({
    delta: "ammunitionMaximum",
    value: ammunitionMaximum,
  });

  return (
    <IconDisplay
      contents={
        <LabelledProgressBar
          label={
            <Stack direction="horizontal">
              {`${ammunitionValue}/${ammunitionMaximumValue}`}

              <FloatingTextQueue delta="ammunitionMaximum" />
            </Stack>
          }
          value={(ammunitionValue / ammunitionMaximumValue) * 100}
          variant="dark"
        />
      }
      Icon={IconAmmunitionPouch}
      tooltip="Ammunition capacity"
    />
  );
}
