import { Button, Modal, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconDead } from "@neverquest/icons/dead.svg";
import { isGameOver } from "@neverquest/state/character";
import { isShowing } from "@neverquest/state/isShowing";
import { useRestart } from "@neverquest/state/seed";

export function GameOver() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const [isShowingGameOver, setIsShowingGameOver] = useRecoilState(isShowing("gameOver"));

  const restart = useRestart();

  const handleHide = () => setIsShowingGameOver(false);

  return (
    <Modal onHide={handleHide} show={isGameOverValue && isShowingGameOver}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={3}>
            <IconImage Icon={IconDead} />
            Death has come.
          </Stack>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>Start a new quest?</Modal.Body>

      <Modal.Footer>
        <Button
          onClick={() => {
            handleHide();
            restart();
          }}
          variant="outline-dark"
        >
          Restart
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
