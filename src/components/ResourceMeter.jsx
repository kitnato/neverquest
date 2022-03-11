import { useRecoilValue } from "recoil";

import FloatingText from "components/FloatingText";
import Progress from "components/Progress";

export default function ResourceMeter({
  attached,
  resourceCurrent,
  resourceDelta,
  resourceMaximum,
}) {
  const resourceCurrentValue = useRecoilValue(resourceCurrent);
  const resourceMaximumValue = useRecoilValue(resourceMaximum);

  return (
    <>
      <Progress
        attached={attached}
        label={`${resourceCurrentValue}/${resourceMaximumValue}`}
        value={(resourceCurrentValue / resourceMaximumValue) * 100}
        variant="secondary"
      />

      <FloatingText delta={resourceDelta} />
    </>
  );
}
