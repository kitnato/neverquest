import { useAtomValue } from "jotai";
import { MouseEvent, useState } from "react";
import { Button } from "react-bootstrap";
import { ExclamationTriangle } from "react-bootstrap-icons";

import ConfirmationDialog from "neverquest/components/ConfirmationDialog";
import useReset from "neverquest/hooks/useReset";
import { gameOver } from "neverquest/state/global";
import { showGameOver } from "neverquest/state/show";
import { AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Restart() {
  const isGameOver = useAtomValue(gameOver);
  const showGameOverValue = useAtomValue(showGameOver);
  const [isResetShowing, setResetShowing] = useState(false);

  const reset = useReset();

  return (
    <>
      <Button
        className={
          isGameOver && !isResetShowing && !showGameOverValue
            ? getAnimationClass(AnimationType.Pulse, true)
            : undefined
        }
        onClick={({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
          currentTarget.blur();

          setResetShowing(true);
        }}
        variant="outline-light"
      >
        <ExclamationTriangle /> Restart
      </Button>

      <ConfirmationDialog
        confirmationLabel="Restart"
        onConfirm={reset}
        message="This will reset all progress and restart from the beginning."
        setHide={() => setResetShowing(false)}
        show={isResetShowing}
        title="Start a new quest?"
      />
    </>
  );
}
