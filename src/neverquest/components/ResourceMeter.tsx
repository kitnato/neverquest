import { RecoilState, RecoilValueReadOnly, useRecoilValue } from "recoil";

import FloatingText from "neverquest/components/FloatingText";
import Progress from "neverquest/components/Progress";
import { UIAttachment, UIVariant } from "neverquest/env.d";

export default function ResourceMeter({
  attached,
  resourceCurrent,
  resourceDelta,
  resourceMaximum,
}: {
  attached?: UIAttachment;
  resourceCurrent: RecoilValueReadOnly<number>;
  resourceDelta?: RecoilState<number>;
  resourceMaximum: RecoilValueReadOnly<number>;
}) {
  const resourceCurrentValue = useRecoilValue(resourceCurrent);
  const resourceMaximumValue = useRecoilValue(resourceMaximum);

  return (
    <>
      <Progress
        attached={attached}
        label={`${resourceCurrentValue}/${resourceMaximumValue}`}
        value={(resourceCurrentValue / resourceMaximumValue) * 100}
        variant={UIVariant.Primary}
      />

      {resourceDelta && <FloatingText atom={resourceDelta} />}
    </>
  );
}
