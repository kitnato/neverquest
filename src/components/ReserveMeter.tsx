import { ProgressBar } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { RESERVES } from "@neverquest/data/reserves";
import { staminaDebuff } from "@neverquest/state/reserves";
import { ReserveType } from "@neverquest/types/enums";
import { type UIAttachment, UIVariant } from "@neverquest/types/ui";

export function ReserveMeter({ attached, type }: { attached?: UIAttachment; type: ReserveType }) {
  const { atom, atomMaximum } = RESERVES[type];

  const atomValue = useRecoilValue(atom);
  const atomMaximumValue = useRecoilValue(atomMaximum);
  const staminaDebuffValue = useRecoilValue(staminaDebuff);

  const isStamina = type === ReserveType.Stamina;
  const sibling = isStamina ? (
    <ProgressBar key={2} now={staminaDebuffValue} striped variant={UIVariant.Primary} />
  ) : undefined;

  return (
    <LabelledProgressBar
      attached={attached}
      label={`${atomValue}/${atomMaximumValue}${
        isStamina && staminaDebuffValue > 0 ? `Blight: ${staminaDebuffValue}` : ""
      }`}
      sibling={sibling}
      value={(atomValue / atomMaximumValue) * 100}
      variant={UIVariant.Primary}
    />
  );
}
