import { useState } from "react";
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
import type { HeadingProps } from "react-markdown/lib/ast-to-react";

import { IconImage } from "@neverquest/components/IconImage";
import manual from "@neverquest/data/manual.md?raw";
import { ReactComponent as IconAbout } from "@neverquest/icons/about.svg";
import { formatSlug } from "@neverquest/utilities/formatters";

const HEADERS = ["h2", "h3", "h4", "h5", "h6"];

export function About() {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>About</Tooltip>} placement="bottom">
        <Button onClick={() => setIsShowing(true)} variant="outline-light">
          <IconImage Icon={IconAbout} size="small" />
        </Button>
      </OverlayTrigger>

      <Modal
        onHide={() => {
          setIsShowing(false);

          window.history.replaceState(null, "", " ");
        }}
        show={isShowing}
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
            components={HEADERS.reduce(
              (aggregator, Current) => ({
                ...aggregator,
                [Current]: ({ children, node: _, ...props }: HeadingProps) => {
                  return (
                    <Current
                      id={
                        Array.isArray(children) && typeof children[0] === "string"
                          ? formatSlug(children[0])
                          : null
                      }
                      {...{ children, ...props }}
                    />
                  );
                },
              }),
              {},
            )}
          >
            {manual}
          </ReactMarkdown>
        </ModalBody>
      </Modal>
    </>
  );
}
