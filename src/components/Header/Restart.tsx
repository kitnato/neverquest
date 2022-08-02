import { MouseEvent, useContext, useState } from "react";
import { Button } from "react-bootstrap";
import { ExclamationTriangle } from "react-bootstrap-icons";
import { useRecoilValue } from "recoil";

import ConfirmationDialog from "@neverquest/components/ConfirmationDialog";
import { isShowing } from "@neverquest/state/isShowing";
import { isGameOver } from "@neverquest/state/global";
import { SeedContext } from "@neverquest/state/SeedContext";
import { ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";

export default function Restart() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const isShowingGameOver = useRecoilValue(isShowing(ShowingType.GameOver));

  const resetSeedContext = useContext(SeedContext);
  const [isShowingRestart, setShowingRestart] = useState(false);

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
        onConfirm={resetSeedContext}
        message="This will reset all progress and restart from the beginning."
        setHide={() => setShowingRestart(false)}
        show={isShowingRestart}
        title="Start a new quest?"
      />
    </>
  );
}
