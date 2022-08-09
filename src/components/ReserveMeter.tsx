import { RecoilValueReadOnly, useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import { UIAttachment, UIVariant } from "@neverquest/types/ui";

export default function ReserveMeter({
  attached,
  atom,
  atomMaximum,
}: {
  attached?: UIAttachment;
  atom: RecoilValueReadOnly<number>;
  atomMaximum: RecoilValueReadOnly<number>;
}) {
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
