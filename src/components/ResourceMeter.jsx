import { useRecoilValue } from "recoil";

import Progress from "components/Progress";

export default function ResourceMeter({
  attached,
  resourceCurrent,
  resourceMax,
}) {
  const resourceCurrentValue = useRecoilValue(resourceCurrent);
  const resourceMaxValue = useRecoilValue(resourceMax);

  return (
    <Progress
      attached={attached}
      label={`${resourceCurrentValue}/${resourceMaxValue}`}
      value={(resourceCurrentValue / resourceMaxValue) * 100}
      variant="secondary"
    />
  );
}
