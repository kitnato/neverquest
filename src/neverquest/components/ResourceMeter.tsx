import { RecoilValueReadOnly, useRecoilValue } from "recoil";

import Progress from "neverquest/components/Progress";
import { UIAttachment, UIVariant } from "neverquest/types/ui";

export default function ResourceMeter({
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
    <Progress
      attached={attached}
      label={`${atomValue}/${atomMaximumValue}`}
      value={(atomValue / atomMaximumValue) * 100}
      variant={UIVariant.Primary}
    />
  );
}
