import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "../IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import IconRestart from "@neverquest/icons/restart.svg?react";
import IconWarning from "@neverquest/icons/warning.svg?react";
import { isGameOver } from "@neverquest/state/character";
import { isShowing } from "@neverquest/state/isShowing";
import { useRestart } from "@neverquest/state/seed";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Restart() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const isShowingGameOver = useRecoilValue(isShowing("gameOver"));

  const [isShowingRestart, setIsShowingRestart] = useState(false);

  const restart = useRestart();

  const onHide = () => {
    setIsShowingRestart(false);
  };

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Restart</Tooltip>} placement="bottom">
        <Button
          className={
            isGameOverValue && !isShowingGameOver && !isShowingRestart
              ? getAnimationClass({ animation: "pulse", isInfinite: true })
              : undefined
          }
          onClick={() => {
            setIsShowingRestart(true);
          }}
          variant="outline-light"
        >
          <IconImage className="small" Icon={IconRestart} />
        </Button>
      </OverlayTrigger>

      <Modal onHide={onHide} show={isShowingRestart}>
        <ModalHeader closeButton>
          <ModalTitle>
            <IconDisplay Icon={IconWarning}>
              <span>Start anew?</span>
            </IconDisplay>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>This will reset everything and restart from scratch.</ModalBody>

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
    </>
  );
}
