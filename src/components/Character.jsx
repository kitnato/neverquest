import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Card from "react-bootstrap/Card";
import FormControl from "react-bootstrap/FormControl";

import Attack from "components/Attack";
import Progress from "components/Progress";
import { name, health } from "state/character/atoms";
import { damagePerHit } from "state/character/selectors";
import damageIcon from "icons/damage.svg";

export default function Character() {
  const dphValue = useRecoilValue(damagePerHit);
  const healthValue = useRecoilValue(health);
  const nameValue = useRecoilValue(name);
  const setName = useSetRecoilState(name);
  const [isEditing, setEditing] = useState(false);

  return (
    <Card>
      <Card.Body>
        <FormControl
          plaintext={!isEditing}
          readOnly={!isEditing}
          defaultValue={nameValue}
          onChange={(event) => setName(event.target.value)}
          onClick={() => setEditing(true)}
          onBlur={() => setEditing(false)}
          className="mb-2"
        />

        <Progress
          variant="danger"
          value={(healthValue.current / healthValue.maximum) * 100}
          label={`${healthValue.current}/${healthValue.maximum}`}
          className="mb-3"
        />

        <div className="d-flex align-items-center justify-content-between">
          <div>
            <img src={damageIcon} alt="Damage" className="mr-2 nq-icon" />
            {dphValue.min}-{dphValue.max}
          </div>

          <Attack />
        </div>
      </Card.Body>
    </Card>
  );
}
