import ls from "localstorage-slim";
import { useContext, useState } from "react";
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

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { KEY_SESSION } from "@neverquest/data/general";
import IconReset from "@neverquest/icons/reset.svg?react";
import IconWarning from "@neverquest/icons/warning.svg?react";
import { SeedContext } from "@neverquest/state/seed";

export function Reset() {
  const context = useContext(SeedContext);
  const [isShowingReset, setIsShowingReset] = useState(false);

  const onHide = () => {
    setIsShowingReset(false);
  };

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            <span>Reset</span>
          </Tooltip>
        }
        placement="bottom"
      >
        <Button
          onClick={() => {
            setIsShowingReset(true);
          }}
          variant="outline-light"
        >
          <IconImage className="small" Icon={IconReset} />
        </Button>
      </OverlayTrigger>

      <Modal onHide={onHide} show={isShowingReset}>
        <ModalHeader closeButton>
          <ModalTitle>
            <IconDisplay Icon={IconWarning}>
              <span>Reset game?</span>
            </IconDisplay>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>This will reset everything and restart from scratch.</ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              onHide();

              ls.remove(KEY_SESSION);
              context();
            }}
            variant="outline-dark"
          >
            Reset
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
