import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconRestart } from "@neverquest/icons/restart.svg";
import { isGameOver } from "@neverquest/state/character";
import { isShowing } from "@neverquest/state/isShowing";
import { useRestart } from "@neverquest/state/seed";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Restart() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const isShowingGameOver = useRecoilValue(isShowing("gameOver"));

  const [isShowingRestart, setIsShowingRestart] = useState(false);

  const restart = useRestart();

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Restart</Tooltip>} placement="bottom">
        <Button
          className={
            isGameOverValue && !isShowingGameOver && !isShowingRestart
              ? getAnimationClass({ isInfinite: true, name: "pulse" })
              : undefined
          }
          onClick={() => setIsShowingRestart(true)}
          variant="outline-light"
        >
          <IconImage Icon={IconRestart} size="small" />
        </Button>
      </OverlayTrigger>

      <ConfirmationDialog
        confirmationLabel="Restart"
        message="This will reset all progress and restart from the beginning."
        onConfirm={restart}
        setHidden={() => setIsShowingRestart(false)}
        show={isShowingRestart}
        title="Start a new quest?"
      />
    </>
  );
}
