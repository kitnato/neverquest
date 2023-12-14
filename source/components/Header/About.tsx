import { type JSX, useState } from "react";
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
import ReactMarkdown from "react-markdown";

import { IconImage } from "@neverquest/components/IconImage";
import manual from "@neverquest/data/manual.md?raw";
import IconAbout from "@neverquest/icons/about.svg?react";
import { formatKebabCase } from "@neverquest/utilities/formatters";

const HEADERS = ["h2", "h3", "h4", "h5", "h6"] as const;

export function About() {
  const [isShowingModal, setIsShowingModal] = useState(false);

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>About</Tooltip>} placement="bottom">
        <Button
          onClick={() => {
            setIsShowingModal(true);
          }}
          variant="outline-light"
        >
          <IconImage className="small" Icon={IconAbout} />
        </Button>
      </OverlayTrigger>

      <Modal
        onHide={() => {
          setIsShowingModal(false);

          window.history.replaceState(undefined, "", " ");
        }}
        show={isShowingModal}
        size="lg"
      >
        <ModalHeader closeButton>
          <ModalTitle>
            <Stack direction="horizontal" gap={3}>
              <IconImage Icon={IconAbout} />
              About
            </Stack>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>
          <ReactMarkdown
            components={Object.fromEntries(
              HEADERS.map((Current) => [
                Current,
                ({ children, ...properties }: JSX.IntrinsicElements[typeof Current]) => (
                  <Current
                    id={typeof children === "string" ? formatKebabCase(children) : undefined}
                    {...{ children, ...properties }}
                  />
                ),
              ]),
            )}
          >
            {manual}
          </ReactMarkdown>
        </ModalBody>
      </Modal>
    </>
  );
}
