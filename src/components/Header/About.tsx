import { useState } from "react";
import { Modal } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import { LABEL_UNKNOWN } from "@neverquest/data/constants";
import { ReactComponent as IconAbout } from "@neverquest/icons/about.svg";

export function About() {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <IconImage
        Icon={IconAbout}
        onClick={() => setIsShowing(true)}
        overlayPlacement="bottom"
        tooltip="About"
      />

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
