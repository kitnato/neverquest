import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { useSetRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import IconDiscard from "@neverquest/icons/discard.svg?react";
import { inventory } from "@neverquest/state/inventory";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function DiscardItem({ ID, name }: { ID: string; name: string }) {
  const setInventoryValue = useSetRecoilState(inventory);

  const [isShowingModal, setIsShowingModal] = useState(false);

  const onHide = () => {
    setIsShowingModal(false);
  };

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Discard</Tooltip>}>
        <Button
          onClick={() => {
            setIsShowingModal(true);
          }}
          variant="outline-dark"
        >
          <IconImage Icon={IconDiscard} isSmall />
        </Button>
      </OverlayTrigger>

      <Modal onHide={onHide} show={isShowingModal}>
        <ModalHeader closeButton>
          <ModalTitle>
            <Stack direction="horizontal" gap={3}>
              <IconImage Icon={IconDiscard} />
              Discard item?
            </Stack>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>{`"${capitalizeAll(name)}" will be lost forever.`}</ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              setInventoryValue((currentInventory) =>
                currentInventory.filter(({ ID: currentItemID }) => currentItemID !== ID),
              );

              onHide();
            }}
            variant="outline-dark"
          >
            Discard
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
