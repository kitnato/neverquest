import { useState } from "react";
import { Button, Modal, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconRestart } from "@neverquest/icons/restart.svg";
import { ReactComponent as IconWarning } from "@neverquest/icons/warning.svg";
import { isGameOver } from "@neverquest/state/character";
import { isShowing } from "@neverquest/state/isShowing";
import { useRestart } from "@neverquest/state/seed";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Restart() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const isShowingGameOver = useRecoilValue(isShowing("gameOver"));

  const [isShowingRestart, setIsShowingRestart] = useState(false);

  const restart = useRestart();

  const handleHide = () => setIsShowingRestart(false);

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

      <Modal onHide={handleHide} show={isShowingRestart}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction="horizontal" gap={3}>
              <IconImage Icon={IconWarning} />
              Start a new quest?
            </Stack>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>This will reset everything and restart from the beginning.</Modal.Body>

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
    </>
  );
}
