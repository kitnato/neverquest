import { useRecoilValue, useSetRecoilState } from "recoil";
import Button from "react-bootstrap/Button";

import { level, location, mode } from "state/global";
import { hasLooted } from "state/loot";

export default function Travel() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const levelValue = useRecoilValue(level);
  const modeValue = useRecoilValue(mode);
  const changeLocation = useSetRecoilState(location);
  const isWilderness = modeValue === 0;
  const destination = (() => {
    if (levelValue > 0) {
      if (isWilderness) {
        return "caravan";
      }
      return "wilderness";
    }

    return isWilderness ? "???" : "wilderness";
  })();

  return (
    <Button
      block
      className={!hasLootedValue && "d-none"}
      onClick={changeLocation}
      variant="outline-dark"
    >
      {`${isWilderness ? "Go to" : "Return to"} ${destination}`}
    </Button>
  );
}
