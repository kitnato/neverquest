import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Card from "react-bootstrap/Card";
import FormControl from "react-bootstrap/FormControl";

import Progress from "components/Progress";
import { name } from "state/character/atoms";
import { damagePerHit, hitpoints, maxHP } from "state/character/selectors";
import damageIcon from "icons/damage.svg";

export default function Character() {
  const dphValue = useRecoilValue(damagePerHit);
  const hpValue = useRecoilValue(hitpoints);
  const maxHPValue = useRecoilValue(maxHP);
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
          value={(hpValue / maxHPValue) * 100}
          label={`${hpValue}/${maxHPValue}`}
        />

        <div className="flex">
          <img src={damageIcon} alt="Damage" className="mr-2 nq-icon" />
          {dphValue.min}-{dphValue.max}
        </div>
      </Card.Body>
    </Card>
  );
}
