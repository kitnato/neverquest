import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import MonsterHealth from "components/Monster/MonsterHealth";
import MonsterName from "components/Monster/MonsterName";
import MonsterOffense from "components/Monster/MonsterOffense";
import ImageIcon from "components/ImageIcon";
import icon from "icons/evil-eyes.svg";
import { isAttacking } from "state/character";

export default function Monster() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const [isEngaged, setEngaged] = useState(false);

  useEffect(() => {
    if (isAttackingValue && !isEngaged) {
      setEngaged(true);
    }
  }, [isAttackingValue, isEngaged]);

  return (
    <Card>
      <Card.Body>
        {isEngaged ? (
          <Stack gap={3}>
            <MonsterName />

            <MonsterHealth />

            <MonsterOffense isEngaged={isEngaged} />
          </Stack>
        ) : (
          <Stack direction="horizontal" gap={3}>
            <ImageIcon icon={icon} tooltip="???" />

            <span style={{ fontStyle: "italic" }}>The darkness stirs.</span>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}
