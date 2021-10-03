import { useState } from "react";
import { useRecoilValue } from "recoil";

import Button from "react-bootstrap/Button";
import { isAttacking } from "state/character";
import { show } from "state/global";

// TODO
export default function CharacterButton() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const showValue = useRecoilValue(show);
  const [isCharacterOpen, setCharacterOpen] = useState(false);

  if (!showValue.stats) {
    return null;
  }

  return (
    <Button
      block
      disabled={isCharacterOpen || isAttackingValue}
      onClick={() => setCharacterOpen(!isCharacterOpen)}
      variant="outline-dark"
    >
      Character
    </Button>
  );
}
