import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import ImageIcon from "components/ImageIcon";
import icon from "icons/open-treasure-chest.svg";
import { isLevelCompleted, show } from "state/global";
import { hasLooted } from "state/loot";

export default function CollectLootButton() {
  const [hasLootedValue, setHasLooted] = useRecoilState(hasLooted);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const setShow = useSetRecoilState(show);

  const handleCollect = () => {
    setShow((currentLoot) => ({ ...currentLoot, inventory: true }));
    setHasLooted();
  };

  if (!isLevelCompletedValue) {
    return null;
  }

  return (
    <OverlayTrigger overlay={<Tooltip>Collect loot</Tooltip>} placement="top">
      <Button
        className={hasLootedValue && "d-none"}
        onClick={handleCollect}
        variant="outline-dark"
      >
        <ImageIcon icon={icon} />
      </Button>
    </OverlayTrigger>
  );
}
