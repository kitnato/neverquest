import { useState } from "react";
import { useRecoilState } from "recoil";
import FormControl from "react-bootstrap/FormControl";

import WithIcon from "components/WithIcon";
import { name } from "state/character";

import nameIcon from "icons/domino-mask.svg";

export default function Character() {
  const [nameValue, setName] = useRecoilState(name);
  const [isEditing, setEditing] = useState(false);

  return (
    <WithIcon icon={nameIcon} alt="Name">
      <FormControl
        plaintext={!isEditing}
        readOnly={!isEditing}
        value={nameValue}
        onChange={(event) => setName(event.target.value)}
        onClick={() => setEditing(true)}
        onKeyPress={({ charCode }) => charCode === 13 && setEditing(false)}
        onBlur={() => setEditing(false)}
      />
    </WithIcon>
  );
}
