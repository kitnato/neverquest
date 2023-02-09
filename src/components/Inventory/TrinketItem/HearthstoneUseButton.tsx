import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import { isAttacking } from "@neverquest/state/character";
import { isLevelCompleted, isWilderness } from "@neverquest/state/encounter";
import { isInventoryOpen } from "@neverquest/state/inventory";
import { hasLooted } from "@neverquest/state/resources";
import { UIVariant } from "@neverquest/types/ui";

export function HearthstoneUseButton() {
  const hasLootedValue = useRecoilValue(hasLooted);
  const isAttackingValue = useRecoilValue(isAttacking);
  const resetIsInventoryOpen = useResetRecoilState(isInventoryOpen);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isWildernessValue = useRecoilValue(isWilderness);

  const [isShowingConfirmation, setIsShowingConfirmation] = useState(false);

  const toggleLocation = useToggleLocation();

  const canWarp = !isAttackingValue && isWildernessValue;

  const handleWarp = () => {
    if (isLevelCompletedValue && !hasLootedValue) {
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
        placement="top"
        trigger={canWarp ? [] : ["focus", "hover"]}
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
        onConfirm={toggleLocation}
        setHide={() => setIsShowingConfirmation(false)}
        show={isShowingConfirmation}
        title="Forfeit loot?"
      />
    </>
  );
}
