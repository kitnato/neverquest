import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { RESERVES } from "@neverquest/data/reserves";
import { ReserveType } from "@neverquest/types/enums";
import { UIAttachment, UIVariant } from "@neverquest/types/ui";

export function ReserveMeter({ attached, type }: { attached?: UIAttachment; type: ReserveType }) {
  const { atom, atomMaximum } = RESERVES[type];

  const atomValue = useRecoilValue(atom);
  const atomMaximumValue = useRecoilValue(atomMaximum);

  return (
    <LabelledProgressBar
      attached={attached}
      label={`${atomValue}/${atomMaximumValue}`}
      value={(atomValue / atomMaximumValue) * 100}
      variant={UIVariant.Primary}
    />
  );
}
