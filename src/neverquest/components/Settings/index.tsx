import { useAtomValue } from "jotai";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import { Gear } from "react-bootstrap-icons";

import SettingsSwitch from "neverquest/components/Settings/SettingsSwitch";
import { hasKnapsack } from "neverquest/state/character";
import { autoEquip, nsfw } from "neverquest/state/global";
import { showDamagePerSecond, showLowHealthWarning } from "neverquest/state/show";

export default function Settings() {
  const hasKnapsackValue = useAtomValue(hasKnapsack);

  const [isShowing, setShowing] = useState(false);

  return (
    <span>
      <Gear style={{ cursor: "pointer" }} onClick={() => setShowing(true)} />

      <Modal show={isShowing} onHide={() => setShowing(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Stack gap={3}>
              <SettingsSwitch atom={nsfw} label="NSFW mode (profanity)" />

              <SettingsSwitch atom={showDamagePerSecond} label="Show damage per second (DPS)" />

              <SettingsSwitch atom={showLowHealthWarning} label="Show low-health warning" />

              <SettingsSwitch
                atom={autoEquip}
                isDisabled={!hasKnapsackValue}
                label="Auto-equip new items"
              />
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </span>
  );
}
