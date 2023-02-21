import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { useCreateMonster } from "@neverquest/hooks/actions/useCreateMonster";
import { isLevelCompleted, isWilderness, progress } from "@neverquest/state/encounter";
import { isInventoryOpen } from "@neverquest/state/inventory";
import { UIVariant } from "@neverquest/types/ui";

export function LodestoneUseButton() {
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const resetIsInventoryOpen = useResetRecoilState(isInventoryOpen);
  const resetProgress = useResetRecoilState(progress);
  const isWildernessValue = useRecoilValue(isWilderness);

  const createMonster = useCreateMonster();

  const canLure = isLevelCompletedValue && isWildernessValue;

  const handleLure = () => {
    resetIsInventoryOpen();
    resetProgress();
    createMonster();
  };

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip>Requires a quiet wilderness.</Tooltip>}
        placement="top"
        trigger={canLure ? [] : ["focus", "hover"]}
      >
        <span className="d-inline-block">
          <Button disabled={!canLure} onClick={handleLure} variant={UIVariant.Outline}>
            Use
          </Button>
        </span>
      </OverlayTrigger>
    </>
  );
}
