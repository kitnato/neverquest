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
import { ShowEverything } from "@neverquest/components/Header/ShowEverything";
import { IconImage } from "@neverquest/components/IconImage";
import IconSettings from "@neverquest/icons/settings.svg?react";
import { ownedItem } from "@neverquest/state/inventory";
import {
  allowNSFW,
  autoEquip,
  lowHealthWarning,
  showDamagePerSecond,
  showEssenceRequired,
  showGearComparison,
  showGearLevel,
} from "@neverquest/state/settings";

export function Settings() {
  const ownedItemKnapsack = useRecoilValue(ownedItem("knapsack"));

  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Settings</Tooltip>} placement="bottom">
        <Button onClick={() => setIsShowing(true)} variant="outline-light">
          <IconImage Icon={IconSettings} size="small" />
        </Button>
      </OverlayTrigger>

      <Modal onHide={() => setIsShowing(false)} show={isShowing}>
        <ModalHeader closeButton>
          <ModalTitle>
            <Stack direction="horizontal" gap={3}>
              <IconImage Icon={IconSettings} />
              Settings
            </Stack>
          </ModalTitle>
        </ModalHeader>

        <ModalBody>
          <Form>
            <Stack gap={3}>
              <SettingsSwitch label="Low-health warning" state={lowHealthWarning} />

              <SettingsSwitch
                isDisabled={ownedItemKnapsack === null}
                label="Auto-equip new gear"
                state={autoEquip}
              />

              <SettingsSwitch label="Show damage per second" state={showDamagePerSecond} />

              <SettingsSwitch label="Show gear comparisons" state={showGearComparison} />

              <SettingsSwitch label="Show gear level" state={showGearLevel} />

              <SettingsSwitch
                label="Show attribute point essence progress"
                state={showEssenceRequired}
              />

              <SettingsSwitch label="NSFW mode (profanity)" state={allowNSFW} />

              <ShowEverything />
            </Stack>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}
