import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import { isAttacking } from "@neverquest/state/character";
import { isStageCompleted, isWilderness } from "@neverquest/state/encounter";
import { isInventoryOpen } from "@neverquest/state/inventory";
import { hasLooted } from "@neverquest/state/resources";

export function UseHearthstone() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const isAttackingValue = useRecoilValue(isAttacking);
  const resetIsInventoryOpen = useResetRecoilState(isInventoryOpen);
  const isStageCompletedValue = useRecoilValue(isStageCompleted);
  const isWildernessValue = useRecoilValue(isWilderness);

  const [isShowingConfirmation, setIsShowingConfirmation] = useState(false);

  const toggleLocation = useToggleLocation();

  const canWarp = !isAttackingValue && isWildernessValue;

  const handleWarp = () => {
    if (isStageCompletedValue && !hasLootedValue) {
      setIsShowingConfirmation(true);
    } else {
      resetIsInventoryOpen();
      toggleLocation();
    }
  };

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip>The hearthstone is cold.</Tooltip>}
        trigger={canWarp ? [] : ["focus", "hover"]}
      >
        <span>
          <Button disabled={!canWarp} onClick={handleWarp} variant="outline-dark">
            Use
          </Button>
        </span>
      </OverlayTrigger>

      <ConfirmationDialog
        confirmationLabel="Warp"
        message="Warping back to the caravan now will forfeit all uncollected loot."
        onConfirm={toggleLocation}
        setHide={() => setIsShowingConfirmation(false)}
        show={isShowingConfirmation}
        title="Forfeit loot?"
      />
    </>
  );
}
