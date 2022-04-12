import { useState } from "react";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Gear } from "react-bootstrap-icons";
import { useRecoilState } from "recoil";

import { nsfw } from "neverquest/state/global";
import { showDamagePerSecond } from "neverquest/state/show";

export default function Settings() {
  const [nsfwValue, setNSFWValue] = useRecoilState(nsfw);
  const [showDPSValue, setShowDPSValue] = useRecoilState(showDamagePerSecond);
  const [isShowing, setShowing] = useState(false);

  const changeNSFWMode = ({ target: { checked } }: { target: { checked: boolean } }) =>
    setNSFWValue(checked);

  const changeShowDPS = ({ target: { checked } }: { target: { checked: boolean } }) =>
    setShowDPSValue(checked);

  return (
    <span>
      <Gear style={{ cursor: "pointer" }} onClick={() => setShowing(true)} />

      <Modal show={isShowing} onHide={() => setShowing(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Switch
              defaultChecked={showDPSValue}
              label="Show damage per second (DPS)"
              onChange={changeShowDPS}
            />

            <Form.Switch defaultChecked={nsfwValue} label="NSFW mode" onChange={changeNSFWMode} />
          </Form>
        </Modal.Body>
      </Modal>
    </span>
  );
}
