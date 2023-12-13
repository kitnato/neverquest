import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { PERCENTAGE_POINTS } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconAmmunitionPouch from "@neverquest/icons/ammunition-pouch.svg?react";
import { ownedItem } from "@neverquest/state/inventory";
import { ammunition, ammunitionMaximum } from "@neverquest/state/items";
import { formatNumber } from "@neverquest/utilities/formatters";

export function AmmunitionPouchCurrent() {
  const ammunitionValue = useRecoilValue(ammunition);
  const ammunitionMaximumValue = useRecoilValue(ammunitionMaximum);
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));

  useDeltaText({
    delta: "ammunition",
    state: ammunition,
  });

  if (ownedAmmunitionPouch !== undefined) {
    return (
      <IconDisplay Icon={IconAmmunitionPouch} tooltip="Ammunition pouch">
        <LabelledProgressBar
          value={(ammunitionValue / ammunitionMaximumValue) * PERCENTAGE_POINTS}
          variant="dark"
        >
          <Stack direction="horizontal" gap={1}>
            <span>
              {`${formatNumber({ value: ammunitionValue })}/${formatNumber({
                value: ammunitionMaximumValue,
              })}`}
            </span>

            <DeltasDisplay delta="ammunition" />
          </Stack>
        </LabelledProgressBar>
      </IconDisplay>
    );
  }
}
