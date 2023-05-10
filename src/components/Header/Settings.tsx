import { useState } from "react";
import { Form, Modal, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { useRecoilValue } from "recoil";

import { SettingsSwitch } from "@neverquest/components/Header/SettingsSwitch";
import { hasKnapsack } from "@neverquest/state/inventory";
import {
  allowNSFW,
  autoEquip,
  confirmControlWarnings,
  isShowingDamagePerSecond,
  isShowingGearLevel,
  lowHealthWarning,
} from "@neverquest/state/settings";

export function Settings() {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);

  const [isShowing, setIsShowing] = useState(false);

  const settingsLabel = "Settings";

  return (
    <span>
      <OverlayTrigger overlay={<Tooltip>{settingsLabel}</Tooltip>} placement="bottom">
        <Gear onClick={() => setIsShowing(true)} style={{ cursor: "pointer" }} />
      </OverlayTrigger>

      <Modal onHide={() => setIsShowing(false)} show={isShowing}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Stack gap={3}>
              <SettingsSwitch atom={allowNSFW} label="NSFW mode (profanity)" />

              <SettingsSwitch
                atom={isShowingDamagePerSecond}
                label="Show damage per second (DPS)"
              />

              <SettingsSwitch atom={lowHealthWarning} label="Low-health warning" />

              <SettingsSwitch
                atom={confirmControlWarnings}
                label="Attack & travel warning confirmations"
              />

              <SettingsSwitch
                atom={autoEquip}
                isDisabled={!hasKnapsackValue}
                label="Auto-equip new items"
              />

              <SettingsSwitch atom={isShowingGearLevel} label="Show gear level" />
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </span>
  );
}
