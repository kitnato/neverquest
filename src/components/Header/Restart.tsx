import { MouseEvent, useState } from "react";
import { Button } from "react-bootstrap";
import { ExclamationTriangle } from "react-bootstrap-icons";
import { useRecoilValue } from "recoil";

import ConfirmationDialog from "@neverquest/components/ConfirmationDialog";
import { isShowing } from "@neverquest/state/isShowing";
import { useReset } from "@neverquest/state/SeedContext";
import { isGameOver } from "@neverquest/state/settings";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function () {
  const isGameOverValue = useRecoilValue(isGameOver);
  const isShowingGameOver = useRecoilValue(isShowing(ShowingType.GameOver));

  const [isShowingRestart, setShowingRestart] = useState(false);

  const reset = useReset();

  return (
    <>
      <Button
        className={
          isGameOverValue && !isShowingGameOver && !isShowingRestart
            ? getAnimationClass({ isInfinite: true, type: AnimationType.Pulse })
            : undefined
        }
        onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
          currentTarget.blur();

          setShowingRestart(true);
        }}
        variant="outline-light"
      >
        <ExclamationTriangle /> Restart
      </Button>

      <ConfirmationDialog
        confirmationLabel="Restart"
        onConfirm={reset}
        message="This will reset all progress and restart from the beginning."
        setHide={() => setShowingRestart(false)}
        show={isShowingRestart}
        title="Start a new quest?"
      />
    </>
  );
}
