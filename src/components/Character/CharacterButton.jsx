import { useState } from "react";
import { useRecoilValue } from "recoil";

import Button from "react-bootstrap/Button";
import { show } from "state/global";

// TODO
export default function CharacterButton() {
  const [isCharacterOpen, setCharacterOpen] = useState(false);
  const showValue = useRecoilValue(show);

  return (
    showValue.stats && (
      <Button
        block
        disabled={isCharacterOpen}
        onClick={() => setCharacterOpen(!isCharacterOpen)}
        variant="outline-dark"
      >
        Character
      </Button>
    )
  );
}
