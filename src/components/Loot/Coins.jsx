import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import coinsIcon from "icons/two-coins.svg";

export default function Coins({ atom }) {
  const coinsValue = useRecoilValue(atom);

  return (
    coinsValue > 0 && (
      <WithIcon icon={coinsIcon} alt="Coins">
        {coinsValue}
      </WithIcon>
    )
  );
}
