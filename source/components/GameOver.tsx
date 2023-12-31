import { Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import IconDead from "@neverquest/icons/dead.svg?react";
import { isGameOver } from "@neverquest/state/character";
import { isShowing } from "@neverquest/state/isShowing";
import { useRestart } from "@neverquest/state/seed";

export function GameOver() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const [isShowingGameOver, setIsShowingGameOver] = useRecoilState(isShowing("gameOver"));

  const restart = useRestart();

  const onHide = () => {
    setIsShowingGameOver(false);
  };

  return (
    <Modal onHide={onHide} show={isGameOverValue && isShowingGameOver}>
      <ModalHeader closeButton>
        <ModalTitle>
          <IconDisplay Icon={IconDead}>
            <span>Flatline.</span>
          </IconDisplay>
        </ModalTitle>
      </ModalHeader>

      <ModalBody>Memory has been erased. Attempt anew?</ModalBody>

      <ModalFooter>
        <Button
          onClick={() => {
            onHide();
            restart();
          }}
          variant="outline-dark"
        >
          Restart
        </Button>
      </ModalFooter>
    </Modal>
  );
}
