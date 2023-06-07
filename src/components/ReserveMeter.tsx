import { ProgressBar } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { RESERVES } from "@neverquest/data/reserves";
import { blight } from "@neverquest/state/reserves";
import type { UIAttachment } from "@neverquest/types/ui";
import type { Reserve } from "@neverquest/types/unions";

export function ReserveMeter({ attached, type }: { attached?: UIAttachment; type: Reserve }) {
  const { atom, atomMaximum } = RESERVES[type];

  const atomValue = useRecoilValue(atom);
  const atomMaximumValue = useRecoilValue(atomMaximum);
  const blightValue = useRecoilValue(blight);

  const isStamina = type === "stamina";
  const sibling = isStamina ? (
    <ProgressBar key={2} now={blightValue} striped variant="dark" />
  ) : undefined;

  return (
    <LabelledProgressBar
      attached={attached}
      label={`${atomValue}/${atomMaximumValue}${
        isStamina && blightValue > 0 ? `Blight: ${blightValue}` : ""
      }`}
      sibling={sibling}
      value={(atomValue / atomMaximumValue) * 100}
      variant="dark"
    />
  );
}
