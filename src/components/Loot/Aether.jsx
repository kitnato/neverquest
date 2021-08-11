import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";

import aetherIcon from "icons/incense.svg";

export default function Aether({ atom }) {
  const aetherValue = useRecoilValue(atom);

  return (
    aetherValue > 0 && (
      <WithIcon icon={aetherIcon} alt="Aether">
        {aetherValue}
      </WithIcon>
    )
  );
}
