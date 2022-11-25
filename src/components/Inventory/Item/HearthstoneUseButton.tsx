import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { isAttacking } from "@neverquest/state/character";
import { isWilderness } from "@neverquest/state/encounter";
// import { hasLooted } from "@neverquest/state/resources";
import { UIVariant } from "@neverquest/types/ui";

// TODO - prompt loot forfeiture
export default function () {
  // const hasLootedValue = useRecoilValue(hasLooted);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isWildernessValue = useRecoilValue(isWilderness);

  const canWarp = !isAttackingValue && isWildernessValue;

  const handleWarp = () => {
    // TODO
  };

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip>The hearthstone is cold.</Tooltip>}
        placement="top"
        trigger={!canWarp ? ["focus", "hover"] : []}
      >
        <span className={"d-inline-block"}>
          <Button disabled={!canWarp} onClick={handleWarp} variant={UIVariant.Outline}>
            Use
          </Button>
        </span>
      </OverlayTrigger>
    </>
  );
}
