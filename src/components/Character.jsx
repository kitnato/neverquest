import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";

import Attack from "components/Attack";
import Progress from "components/Progress";
import WithIcon from "components/WithIcon";
import { name, health, stamina } from "state/character/atoms";
import { damagePerHit } from "state/character/selectors";

import damageIcon from "icons/power-lightning.svg";
import healthIcon from "icons/hospital-cross.svg";
import nameIcon from "icons/domino-mask.svg";
import staminaIcon from "icons/fist.svg";

export default function Character() {
  const dphValue = useRecoilValue(damagePerHit);
  const healthValue = useRecoilValue(health);
  const staminaValue = useRecoilValue(stamina);
  const nameValue = useRecoilValue(name);
  const setName = useSetRecoilState(name);
  const [isEditing, setEditing] = useState(false);

  return (
    <Card>
      <Card.Body>
        <WithIcon icon={nameIcon} alt="Name" className="mb-3">
          <FormControl
            plaintext={!isEditing}
            readOnly={!isEditing}
            defaultValue={nameValue}
            onChange={(event) => setName(event.target.value)}
            onClick={() => setEditing(true)}
            onKeyPress={({ charCode }) => charCode === 13 && setEditing(false)}
            onBlur={() => setEditing(false)}
          />
        </WithIcon>

        <WithIcon icon={healthIcon} alt="Health" className="mb-2">
          <Progress
            variant="danger"
            value={(healthValue.current / healthValue.maximum) * 100}
            label={`${healthValue.current}/${healthValue.maximum}`}
          />
        </WithIcon>

        <WithIcon icon={staminaIcon} alt="Stamina" className="mb-3">
          <Progress
            variant="success"
            value={(staminaValue.current / staminaValue.maximum) * 100}
            label={`${staminaValue.current}/${staminaValue.maximum}`}
          />
        </WithIcon>

        <Row className="align-items-center">
          <Col>
            <WithIcon icon={damageIcon} alt="Damage">
              {dphValue.min}-{dphValue.max}
            </WithIcon>
          </Col>

          <Col>
            <Attack />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
