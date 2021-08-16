import { useRecoilState, useSetRecoilState } from "recoil";
import Button from "react-bootstrap/Button";

import { show } from "state/global";
import { hasLooted } from "state/resources";

export default function CollectLoot() {
  const [hasLootedValue, setHasLooted] = useRecoilState(hasLooted);
  const setShow = useSetRecoilState(show);

  const handleCollect = () => {
    setShow((currentShow) => ({ ...currentShow, resources: true }));
    setHasLooted();
  };

  return (
    <Button
      block
      className={hasLootedValue && "d-none"}
      onClick={handleCollect}
      variant="outline-dark"
    >
      Collect loot
    </Button>
  );
}
