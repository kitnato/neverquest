import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Row from "react-bootstrap/Row";

import Attack from "components/Attack";
import Health from "components/Health";
import Stamina from "components/Stamina";
import WithIcon from "components/WithIcon";
import { name } from "state/character/atoms";
import { damagePerHit } from "state/character/selectors";

import damageIcon from "icons/power-lightning.svg";
import nameIcon from "icons/domino-mask.svg";

export default function Character() {
  const dphValue = useRecoilValue(damagePerHit);
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

        <Health />

        <Stamina />

        <Row className="align-items-center mt-2" noGutters>
          <Col xs={8}>
            <WithIcon icon={damageIcon} alt="Damage">
              {dphValue.min}-{dphValue.max}
            </WithIcon>
          </Col>

          <Col xs={4}>
            <Attack />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
