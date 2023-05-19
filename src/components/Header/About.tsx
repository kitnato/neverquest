import { useState } from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import { LABEL_UNKNOWN } from "@neverquest/data/constants";
import { ReactComponent as IconAbout } from "@neverquest/icons/about.svg";

export function About() {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>About</Tooltip>} placement="bottom">
        <Button onClick={() => setIsShowing(true)} variant="outline-light">
          <IconImage Icon={IconAbout} size="small" />
        </Button>
      </OverlayTrigger>

      <Modal onHide={() => setIsShowing(false)} show={isShowing}>
        <Modal.Header closeButton>
          <Modal.Title>
            <IconImage Icon={IconAbout} />
            &nbsp;About
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>{LABEL_UNKNOWN}</Modal.Body>
      </Modal>
    </>
  );
}
