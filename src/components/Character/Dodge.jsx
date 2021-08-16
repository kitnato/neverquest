import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import dodgeIcon from "icons/wingfoot.svg";
import { dodge } from "state/stats";

export default function Dodge() {
  const dodgeValue = useRecoilValue(dodge);

  if (dodgeValue.max === 0) {
    return null;
  }

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={dodgeIcon} tooltip="Dodge" />

      <span>{dodgeValue.current * 100}%</span>
    </div>
  );
}
