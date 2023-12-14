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
import IconEradicate from "@neverquest/icons/eradicate.svg?react";
import { merchantInventory } from "@neverquest/state/caravan";

export function EradicateItem({ ID }: { ID: string }) {
  const setMerchantInventoryValue = useSetRecoilState(merchantInventory);

  const [isShowingModal, setIsShowingModal] = useState(false);

  const onHide = () => {
    setIsShowingModal(false);
  };

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Eradicate</Tooltip>}>
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
            <Stack direction="horizontal" gap={3}>
              <IconImage Icon={IconEradicate} />
              Eradicate item?
            </Stack>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>The item will no longer be available for purchase.</ModalBody>

        <ModalFooter>
          <Button
            onClick={() => {
              setMerchantInventoryValue((currentMerchantInventory) =>
                currentMerchantInventory.filter(({ ID: currentItemID }) => currentItemID !== ID),
              );

              onHide();
            }}
            variant="outline-dark"
          >
            Eradicate
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
