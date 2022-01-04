import { useRecoilValue } from "recoil";

import FloatingText from "components/FloatingText";
import Progress from "components/Progress";

export default function ResourceMeter({
  attached,
  resourceCurrent,
  resourceDelta,
  resourceMax,
}) {
  const resourceCurrentValue = useRecoilValue(resourceCurrent);
  const resourceMaxValue = useRecoilValue(resourceMax);

  return (
    <>
      <Progress
        attached={attached}
        label={`${resourceCurrentValue}/${resourceMaxValue}`}
        value={(resourceCurrentValue / resourceMaxValue) * 100}
        variant="secondary"
      />

      <FloatingText delta={resourceDelta} />
    </>
  );
}
