import ls from "localstorage-slim";
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
import { formatKebabCase } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

const INVALID_FILE = "Invalid file.";

export function SaveLoad() {
  const nameValue = useRecoilValue(name);

  const [isLoading, setIsLoading] = useState(false);
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

      <Modal backdrop={isLoading ? "static" : undefined} onHide={onHide} show={isShowingModal}>
        <ModalHeader closeButton={!isLoading}>
          <ModalTitle>
            <IconDisplay
              Icon={IconSaveLoad}
              iconProps={{
                className: isLoading
                  ? `${getAnimationClass({ animation: "pulse", isInfinite: true, speed: "fast" })}`
                  : undefined,
              }}
            >
              <span>Save & load game</span>
            </IconDisplay>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Stack gap={3}>
            <Button
              disabled={isLoading}
              onClick={() => {
                const session = ls.get<string>(KEY_SESSION);

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
                  `neverquest-save${nameValue === LABEL_UNKNOWN ? "" : `-${formatKebabCase(nameValue)}`}.${FILE_EXTENSION}`,
                );

                document.body.append(downloadAnchorNode);

                downloadAnchorNode.click();
                downloadAnchorNode.remove();

                onHide();
              }}
              variant="outline-dark"
            >
              <IconImage className="small" Icon={IconSave} />

              <span>&nbsp;Save</span>
            </Button>

            <Button
              disabled={isLoading}
              onClick={() => {
                fileInput.current?.click();
              }}
              variant="outline-dark"
            >
              <IconImage className="small" Icon={IconLoad} />

              <span>&nbsp;Load</span>
            </Button>

            <input
              accept=".nq"
              className="invisible position-absolute"
              disabled={isLoading}
              onChange={({ target: { files } }) => {
                if (files !== null && files.length === 1) {
                  const [file] = files;

                  if (file === undefined) {
                    throw new Error(INVALID_FILE);
                  } else {
                    setIsLoading(true);

                    file
                      .text()
                      .then((session) => {
                        ls.set(KEY_SESSION, session);

                        location.reload();
                      })
                      .catch(() => {
                        setIsLoading(false);

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
