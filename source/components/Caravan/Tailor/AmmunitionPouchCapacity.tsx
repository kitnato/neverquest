import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { PERCENTAGE_POINTS } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconAmmunitionPouch from "@neverquest/icons/ammunition-pouch.svg?react";
import { ammunition, ammunitionMaximum } from "@neverquest/state/items";

export function AmmunitionPouchCapacity() {
  const ammunitionValue = useRecoilValue(ammunition);
  const ammunitionMaximumValue = useRecoilValue(ammunitionMaximum);

  useDeltaText({
    delta: "ammunitionMaximum",
    state: ammunitionMaximum,
  });

  return (
    <IconDisplay Icon={IconAmmunitionPouch} tooltip="Ammunition capacity">
      <LabelledProgressBar
        value={(ammunitionValue / ammunitionMaximumValue) * PERCENTAGE_POINTS}
        variant="dark"
      >
        <Stack direction="horizontal" gap={1}>
          <span>{`${ammunitionValue}/${ammunitionMaximumValue}`}</span>

          <DeltasDisplay delta="ammunitionMaximum" />
        </Stack>
      </LabelledProgressBar>
    </IconDisplay>
  );
}
