import { useState } from "react";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  OverlayTrigger,
  Stack,
  Tooltip,
} from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { SettingsSwitch } from "@neverquest/components/Header/SettingsSwitch";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import IconSettings from "@neverquest/icons/settings.svg?react";
import { ownedItem } from "@neverquest/state/inventory";
import {
  allowProfanity,
  autoEquip,
  lowHealthWarning,
  showDamagePerSecond,
  showGearComparison,
  showGearLevel,
} from "@neverquest/state/settings";

export function Settings() {
  const ownedItemKnapsack = useRecoilValue(ownedItem("knapsack"));

  const [isShowingModal, setIsShowingModal] = useState(false);

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Settings</Tooltip>} placement="bottom">
        <Button
          onClick={() => {
            setIsShowingModal(true);
          }}
          variant="outline-light"
        >
          <IconImage className="small" Icon={IconSettings} />
        </Button>
      </OverlayTrigger>

      <Modal
        onHide={() => {
          setIsShowingModal(false);
        }}
        show={isShowingModal}
      >
        <ModalHeader closeButton>
          <ModalTitle>
            <IconDisplay Icon={IconSettings}>
              <span>Settings</span>
            </IconDisplay>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Form>
            <Stack gap={3}>
              <SettingsSwitch label="Low-health warning" state={lowHealthWarning} />

              <SettingsSwitch
                isDisabled={ownedItemKnapsack === undefined}
                label="Auto-equip new gear"
                state={autoEquip}
              />

              <SettingsSwitch label="Show damage per second" state={showDamagePerSecond} />

              <SettingsSwitch label="Show gear comparisons" state={showGearComparison} />

              <SettingsSwitch label="Show gear level" state={showGearLevel} />

              <SettingsSwitch label="Allow profanity" state={allowProfanity} />
            </Stack>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}
