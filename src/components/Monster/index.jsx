import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue, useRecoilState } from "recoil";

import MonsterHealth from "components/Monster/MonsterHealth";
import MonsterName from "components/Monster/MonsterName";
import MonsterOffense from "components/Monster/MonsterOffense";
import ImageIcon from "components/ImageIcon";
import icon from "icons/evil-eyes.svg";
import { isAttacking } from "state/character";
import { isEngaged } from "state/monster";

export default function Monster() {
  const [isEngagedValue, setEngaged] = useRecoilState(isEngaged);
  const isAttackingValue = useRecoilValue(isAttacking);

  useEffect(() => {
    if (isAttackingValue && !isEngagedValue) {
      setEngaged(true);
    }
  }, [isAttackingValue, isEngagedValue, setEngaged]);

  return (
    <Card>
      <Card.Body>
        {isEngagedValue ? (
          <Stack gap={3}>
            <MonsterName />

            <MonsterHealth />

            <MonsterOffense />
          </Stack>
        ) : (
          <Stack direction="horizontal" gap={3}>
            <ImageIcon icon={icon} tooltip="???" />

            <span>The darkness is stirring with hostile intentions.</span>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}
