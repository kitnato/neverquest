import { useRecoilState, useSetRecoilState } from "recoil";
import Button from "react-bootstrap/Button";

import { show } from "state/global";
import { hasLooted } from "state/loot";

export default function CollectLoot() {
  const [hasLootedValue, setHasLooted] = useRecoilState(hasLooted);
  const setShow = useSetRecoilState(show);

  const handleCollect = () => {
    setShow((currentLoot) => ({ ...currentLoot, inventory: true }));
    setHasLooted();
  };

  return (
    <div className="d-grid">
      <Button
        className={hasLootedValue && "d-none"}
        onClick={handleCollect}
        variant="outline-dark"
      >
        Collect loot
      </Button>
    </div>
  );
}
