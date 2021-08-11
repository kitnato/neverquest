import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import dodgeIcon from "icons/wingfoot.svg";
import { dodge } from "state/stats";

export default function Dodge() {
  const dodgeValue = useRecoilValue(dodge);

  return (
    <WithIcon
      alt="Dodge"
      className={`${dodgeValue.current === 0 ? "invisible" : ""}`}
      icon={dodgeIcon}
    >
      {dodgeValue.current * 100}%
    </WithIcon>
  );
}
