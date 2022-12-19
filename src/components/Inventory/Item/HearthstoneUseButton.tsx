import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import ConfirmationDialog from "@neverquest/components/ConfirmationDialog";
import useSwitchLocation from "@neverquest/hooks/actions/useSwitchLocation";
import { isAttacking } from "@neverquest/state/character";
import { isLevelCompleted, isWilderness } from "@neverquest/state/encounter";
import { isInventoryOpen } from "@neverquest/state/inventory";
import { hasLooted } from "@neverquest/state/resources";
import { UIVariant } from "@neverquest/types/ui";

export default function () {
  const hasLootedValue = useRecoilValue(hasLooted);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const resetIsInventoryOpen = useResetRecoilState(isInventoryOpen);

  const [isShowingConfirmation, setIsShowingConfirmation] = useState(false);

  const switchLocation = useSwitchLocation();

  const canWarp = !isAttackingValue && isWildernessValue;

  const handleWarp = () => {
    if (isLevelCompletedValue && !hasLootedValue) {
      setIsShowingConfirmation(true);
    } else {
      resetIsInventoryOpen();
      switchLocation();
    }
  };

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip>The hearthstone is cold.</Tooltip>}
        placement="top"
        trigger={!canWarp ? ["focus", "hover"] : []}
      >
        <span className="d-inline-block">
          <Button disabled={!canWarp} onClick={handleWarp} variant={UIVariant.Outline}>
            Use
          </Button>
        </span>
      </OverlayTrigger>

      <ConfirmationDialog
        confirmationLabel="Warp"
        message="Warping back to Caravan now will forfeit all uncollected loot."
        onConfirm={switchLocation}
        setHide={() => setIsShowingConfirmation(false)}
        show={isShowingConfirmation}
        title="Forfeit loot?"
      />
    </>
  );
}
