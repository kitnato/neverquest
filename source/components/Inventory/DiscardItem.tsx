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

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDiscard } from "@neverquest/hooks/actions/useDiscard";
import IconDiscard from "@neverquest/icons/discard.svg?react";
import type { InventoryItem } from "@neverquest/types";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function DiscardItem({ item }: { item: InventoryItem }) {
  const [isShowingModal, setIsShowingModal] = useState(false);

  const discard = useDiscard();

  const onHide = () => {
    setIsShowingModal(false);
  };

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            <span>Discard</span>
          </Tooltip>
        }
      >
        <Button
          onClick={() => {
            setIsShowingModal(true);
          }}
          variant="outline-dark"
        >
          <IconImage className="small" Icon={IconDiscard} />
        </Button>
      </OverlayTrigger>

      <Modal onHide={onHide} show={isShowingModal}>
        <ModalHeader closeButton>
          <ModalTitle>
            <IconDisplay Icon={IconDiscard}>
              <span>Discard item?</span>
            </IconDisplay>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>{`"${capitalizeAll(item.name)}" will be lost forever.`}</ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              discard(item);

              onHide();
            }}
            variant="outline-dark"
          >
            <span>Discard</span>
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
