import { useState } from "react";
import { useRecoilState } from "recoil";
import FormControl from "react-bootstrap/FormControl";

import ImageIcon from "components/ImageIcon";
import icon from "icons/domino-mask.svg";
import { name } from "state/character";

export default function Character() {
  const [nameValue, setName] = useRecoilState(name);
  const [isEditing, setEditing] = useState(false);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
      <ImageIcon icon={icon} tooltip="Name" />

      <FormControl
        plaintext={!isEditing}
        readOnly={!isEditing}
        value={nameValue}
        onChange={(event) => setName(event.target.value)}
        onClick={() => setEditing(true)}
        onKeyPress={({ charCode }) => charCode === 13 && setEditing(false)}
        onBlur={() => setEditing(false)}
      />
    </div>
  );
}
