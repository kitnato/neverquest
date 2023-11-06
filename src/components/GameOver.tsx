import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Stack,
} from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import IconDead from "@neverquest/icons/dead.svg?react";
import { isGameOver } from "@neverquest/state/character";
import { isShowing } from "@neverquest/state/isShowing";
import { useRestart } from "@neverquest/state/seed";

export function GameOver() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const [isShowingGameOver, setIsShowingGameOver] = useRecoilState(isShowing("gameOver"));

  const restart = useRestart();

  const onHide = () => setIsShowingGameOver(false);

  return (
    <Modal onHide={onHide} show={isGameOverValue && isShowingGameOver}>
      <ModalHeader closeButton>
        <ModalTitle>
          <Stack direction="horizontal" gap={3}>
            <IconImage Icon={IconDead} />
            Death has come.
          </Stack>
        </ModalTitle>
      </ModalHeader>

      <ModalBody>Darkness has erased all lineage across this world. Start a new quest?</ModalBody>

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
