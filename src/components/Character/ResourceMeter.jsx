import { useRecoilValue } from "recoil";

import Progress from "components/Progress";

export default function ResourceMeter({ attached, resource }) {
  const value = useRecoilValue(resource);

  return (
    <Progress
      attached={attached}
      label={`${value.current}/${value.max}`}
      value={(value.current / value.max) * 100}
      variant="secondary"
    />
  );
}
