import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import { Gear } from "react-bootstrap-icons";
import { SetterOrUpdater, useRecoilState } from "recoil";

import { autoEquip, nsfw } from "neverquest/state/global";
import { showDamagePerSecond } from "neverquest/state/show";

export default function Settings() {
  const [autoEquipValue, setAutoEquip] = useRecoilState(autoEquip);
  const [nsfwValue, setNSFW] = useRecoilState(nsfw);
  const [showDPSValue, setShowDPS] = useRecoilState(showDamagePerSecond);
  const [isShowing, setShowing] = useState(false);

  const changeSetting =
    (setter: SetterOrUpdater<boolean>) =>
    ({ target: { checked } }: { target: { checked: boolean } }) =>
      setter(checked);

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
              <Form.Switch
                defaultChecked={nsfwValue}
                label="NSFW mode"
                onChange={changeSetting(setNSFW)}
              />

              <Form.Switch
                defaultChecked={showDPSValue}
                label="Show damage per second (DPS)"
                onChange={changeSetting(setShowDPS)}
              />

              <Form.Switch
                defaultChecked={autoEquipValue}
                label="Auto-equip new items"
                onChange={changeSetting(setAutoEquip)}
              />
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>
    </span>
  );
}
