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
    <Stack className="w-100" direction="horizontal">
      <IconDisplay contents="" Icon={IconAmmunitionPouch} tooltip="Ammunition pouch capacity" />

      <FloatingText deltaType="ammunitionMaximum" />

      <div className="w-100">
        <LabelledProgressBar
          label={`${ammunitionValue}/${ammunitionMaximumValue}`}
          value={(ammunitionValue / ammunitionMaximumValue) * 100}
          variant="dark"
        />
      </div>
    </Stack>
  );
}
