import { useRef, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { FILE_EXTENSION, KEY_SESSION, LABEL_UNKNOWN } from "@neverquest/data/general";
import IconLoad from "@neverquest/icons/load.svg?react";
import IconSaveLoad from "@neverquest/icons/save-load.svg?react";
import IconSave from "@neverquest/icons/save.svg?react";
import { name } from "@neverquest/state/character";

const INVALID_FILE = "Invalid file.";

export function SaveLoad() {
  const nameValue = useRecoilValue(name);

  const [isShowingModal, setIsShowingModal] = useState(false);

  const fileInput = useRef<HTMLInputElement>(null);

  const onHide = () => {
    setIsShowingModal(false);
  };

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Save & load</Tooltip>} placement="bottom">
        <Button
          onClick={() => {
            setIsShowingModal(true);
          }}
          variant="outline-light"
        >
          <IconImage className="small" Icon={IconSaveLoad} />
        </Button>
      </OverlayTrigger>

      <Modal onHide={onHide} show={isShowingModal}>
        <ModalHeader closeButton>
          <ModalTitle>
            <IconDisplay Icon={IconSaveLoad}>
              <span>Save & load game</span>
            </IconDisplay>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Stack gap={3}>
            <Button
              onClick={() => {
                const session = localStorage.getItem(KEY_SESSION);

                if (session === null) {
                  throw new Error("Invalid session.");
                }

                const downloadAnchorNode = document.createElement("a");

                downloadAnchorNode.setAttribute(
                  "href",
                  "data:text/json;charset=utf-8," + encodeURIComponent(session),
                );
                downloadAnchorNode.setAttribute(
                  "download",
                  `neverquest-save${nameValue === LABEL_UNKNOWN ? "" : `-${nameValue}`}.${FILE_EXTENSION}`,
                );

                document.body.append(downloadAnchorNode);

                downloadAnchorNode.click();
                downloadAnchorNode.remove();

                onHide();
              }}
              variant="outline-dark"
            >
              <IconImage className="small" Icon={IconSave} />
              &nbsp;<span>Save</span>
            </Button>

            <Button
              onClick={() => {
                fileInput.current?.click();
              }}
              variant="outline-dark"
            >
              <IconImage className="small" Icon={IconLoad} />
              &nbsp;Load
            </Button>

            <input
              accept=".nq"
              className="invisible position-absolute"
              onChange={({ target: { files } }) => {
                if (files !== null && files.length === 1) {
                  const [file] = files;

                  if (file === undefined) {
                    throw new Error(INVALID_FILE);
                  } else {
                    file
                      .text()
                      .then((session) => {
                        localStorage.setItem(KEY_SESSION, session);

                        location.reload();
                      })
                      .catch(() => {
                        throw new Error(INVALID_FILE);
                      });
                  }
                } else {
                  throw new Error(INVALID_FILE);
                }
              }}
              ref={fileInput}
              type="file"
            />
          </Stack>
        </ModalBody>
      </Modal>
    </>
  );
}
