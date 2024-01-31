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
import { useEradicate } from "@neverquest/hooks/actions/useEradicate";
import IconEradicate from "@neverquest/icons/eradicate.svg?react";
import type { MerchantInventoryItem } from "@neverquest/types";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function EradicateItem({ item }: { item: MerchantInventoryItem }) {
  const [isShowingModal, setIsShowingModal] = useState(false);

  const eradicate = useEradicate();

  const onHide = () => {
    setIsShowingModal(false);
  };

  return (
    <>
      <OverlayTrigger
        overlay={
          <Tooltip>
            <span>Eradicate</span>
          </Tooltip>
        }
      >
        <Button
          onClick={() => {
            setIsShowingModal(true);
          }}
          variant="outline-dark"
        >
          <IconImage className="small" Icon={IconEradicate} />
        </Button>
      </OverlayTrigger>

      <Modal onHide={onHide} show={isShowingModal}>
        <ModalHeader closeButton>
          <ModalTitle>
            <IconDisplay Icon={IconEradicate}>
              <span>Eradicate item?</span>
            </IconDisplay>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>{`"${capitalizeAll(
          item.name,
        )}" will no longer be available for purchase.`}</ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              eradicate(item);

              onHide();
            }}
            variant="outline-dark"
          >
            <span>Eradicate</span>
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
