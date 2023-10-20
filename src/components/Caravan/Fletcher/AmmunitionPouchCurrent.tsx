import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconAmmunitionPouch from "@neverquest/icons/ammunition-pouch.svg?react";
import { ammunition, ammunitionMaximum, ownedItem } from "@neverquest/state/items";

export function AmmunitionPouchCurrent() {
  const ammunitionValue = useRecoilValue(ammunition);
  const ammunitionMaximumValue = useRecoilValue(ammunitionMaximum);
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));

  useDeltaText({
    delta: "ammunition",
    value: ammunition,
  });

  if (ownedAmmunitionPouch === null) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <LabelledProgressBar
          label={
            <Stack direction="horizontal">
              {`${ammunitionValue}/${ammunitionMaximumValue}`}

              <FloatingTextQueue delta="ammunition" />
            </Stack>
          }
          value={(ammunitionValue / ammunitionMaximumValue) * 100}
          variant="dark"
        />
      }
      Icon={IconAmmunitionPouch}
      tooltip="Ammunition pouch"
    />
  );
}
