import { RecoilState, RecoilValueReadOnly, useRecoilValue } from "recoil";

import FloatingText from "neverquest/components/FloatingText";
import Progress from "neverquest/components/Progress";
import { DeltaDisplay, UIAttachment, UIVariant } from "neverquest/env";

export default function ResourceMeter({
  attached,
  atom,
  atomDelta,
  atomMaximum,
}: {
  attached?: UIAttachment;
  atom: RecoilValueReadOnly<number>;
  atomDelta?: RecoilState<DeltaDisplay>;
  atomMaximum: RecoilValueReadOnly<number>;
}) {
  const atomValue = useRecoilValue(atom);
  const atomMaximumValue = useRecoilValue(atomMaximum);

  return (
    <>
      <Progress
        attached={attached}
        label={`${atomValue}/${atomMaximumValue}`}
        value={(atomValue / atomMaximumValue) * 100}
        variant={UIVariant.Primary}
      />

      {atomDelta && <FloatingText atom={atomDelta} />}
    </>
  );
}
