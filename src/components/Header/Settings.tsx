import { useState } from "react";
import { Button, Form, Modal, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { SettingsSwitch } from "@neverquest/components/Header/SettingsSwitch";
import { ShowEverything } from "@neverquest/components/Header/ShowEverything";
import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconSettings } from "@neverquest/icons/settings.svg";
import { hasKnapsack } from "@neverquest/state/inventory";
import {
  allowNSFW,
  autoEquip,
  lowHealthWarning,
  showDamagePerSecond,
  showGearComparison,
  showGearLevel,
} from "@neverquest/state/settings";

export function Settings() {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);

  const [isShowing, setIsShowing] = useState(false);

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Settings</Tooltip>} placement="bottom">
        <Button onClick={() => setIsShowing(true)} variant="outline-light">
          <IconImage Icon={IconSettings} size="small" />
        </Button>
      </OverlayTrigger>

      <Modal onHide={() => setIsShowing(false)} show={isShowing}>
        <Modal.Header closeButton>
          <Modal.Title>
            <IconImage Icon={IconSettings} />
            &nbsp;Settings
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Stack gap={3}>
              <SettingsSwitch atom={lowHealthWarning} label="Low-health warning" />

              <SettingsSwitch
                atom={autoEquip}
                isDisabled={!hasKnapsackValue}
                label="Auto-equip new gear"
              />

              <SettingsSwitch atom={showDamagePerSecond} label="Show damage per second" />

              <SettingsSwitch atom={showGearComparison} label="Show gear comparisons" />

              <SettingsSwitch atom={showGearLevel} label="Show gear level" />

              <SettingsSwitch atom={allowNSFW} label="NSFW mode (profanity)" />

              <ShowEverything />
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}
