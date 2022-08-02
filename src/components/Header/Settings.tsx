import { useState } from "react";
import { Form, Modal, Stack } from "react-bootstrap";
import { Gear } from "react-bootstrap-icons";
import { useRecoilValue } from "recoil";

import SettingsSwitch from "@neverquest/components/Header/SettingsSwitch";
import { hasKnapsack } from "@neverquest/state/character";
import { autoEquip, lowHealthWarning, nsfw } from "@neverquest/state/global";
import { isShowing as isShowingAtom } from "@neverquest/state/isShowing";
import { ShowingType } from "@neverquest/types/enums";

export default function Settings() {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);

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

              <SettingsSwitch
                atom={isShowingAtom(ShowingType.DamagePerSecond)}
                label="Show damage per second (DPS)"
              />

              <SettingsSwitch atom={lowHealthWarning} label="Show low-health warning" />

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
