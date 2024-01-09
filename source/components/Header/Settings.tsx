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
import { SETTINGS } from "@neverquest/data/settings";
import IconSettings from "@neverquest/icons/settings.svg?react";
import { ownedItem } from "@neverquest/state/inventory";
import { SETTINGS_TYPES } from "@neverquest/types/unions";

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
              {SETTINGS_TYPES.map((setting) => {
                const { label } = SETTINGS[setting];

                return (
                  <SettingsSwitch
                    isDisabled={setting === "autoEquip" ? ownedItemKnapsack === undefined : false}
                    key={setting}
                    label={label}
                    setting={setting}
                  />
                );
              })}
            </Stack>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}
