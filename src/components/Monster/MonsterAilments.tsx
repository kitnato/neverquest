import { Card, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { MonsterBleeding } from "@neverquest/components/Monster/MonsterBleeding";
import { MonsterElementalAilment } from "@neverquest/components/Monster/MonsterElementalAilment";
import { MonsterStaggered } from "@neverquest/components/Monster/MonsterStaggered";
import { canReceiveAilments } from "@neverquest/state/monster";
import { ELEMENTAL_TYPES } from "@neverquest/types/unions";

export function MonsterAilments() {
  const canReceiveAilmentsValue = useRecoilValue(canReceiveAilments);

  if (!canReceiveAilmentsValue) {
    return null;
  }

  return (
    <Card>
      <Card.Body>
        <Stack gap={3}>
          {ELEMENTAL_TYPES.map((current) => (
            <MonsterElementalAilment key={current} type={current} />
          ))}

          <MonsterStaggered />

          <MonsterBleeding />
        </Stack>
      </Card.Body>
    </Card>
  );
}
