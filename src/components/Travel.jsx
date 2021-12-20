import { useRecoilValue, useSetRecoilState } from "recoil";
import Button from "react-bootstrap/Button";

import { isWilderness, level, location } from "state/global";
import { hasLooted } from "state/loot";

export default function Travel() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const levelValue = useRecoilValue(level);
  const isWildernessValue = useRecoilValue(isWilderness);
  const changeLocation = useSetRecoilState(location);
  const destination = (() => {
    if (levelValue > 0) {
      if (isWildernessValue) {
        return "caravan";
      }
      return "wilderness";
    }

    return isWildernessValue ? "???" : "wilderness";
  })();

  return (
    <div className="d-grid">
      <Button
        className={!hasLootedValue && "d-none"}
        onClick={changeLocation}
        variant="outline-dark"
      >
        {`${isWildernessValue ? "Go to" : "Return to"} ${destination}`}
      </Button>
    </div>
  );
}
