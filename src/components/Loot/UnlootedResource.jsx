import { useRecoilValue } from "recoil";

import Aether from "components/Loot/Aether";
import Coins from "components/Loot/Coins";
import Scrap from "components/Loot/Scrap";

export default function UnlootedResource({ atom, name }) {
  const unlootedResourceValue = useRecoilValue(atom);

  if (unlootedResourceValue === 0) {
    return null;
  }

  switch (name) {
    case "aether":
      return <Aether value={unlootedResourceValue} />;
    case "coins":
      return <Coins value={unlootedResourceValue} />;
    case "scrap":
      return <Scrap value={unlootedResourceValue} />;
    default:
      break;
  }
}
