import { Card, CardBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { MonsterBleeding } from "@neverquest/components/Monster/MonsterBleeding";
import { MonsterElementalAilment } from "@neverquest/components/Monster/MonsterElementalAilment";
import { MonsterStaggered } from "@neverquest/components/Monster/MonsterStaggered";
import { MonsterStunned } from "@neverquest/components/Monster/MonsterStunned";
import { canReceiveAilments } from "@neverquest/state/ailments";
import { ELEMENTAL_TYPES } from "@neverquest/types/unions";

export function MonsterAilments() {
  const canReceiveAilmentsValue = useRecoilValue(canReceiveAilments);

  if (canReceiveAilmentsValue) {
    return (
      <Card>
        <CardBody>
          <Stack gap={3}>
            {ELEMENTAL_TYPES.map((elemental) => (
              <MonsterElementalAilment elemental={elemental} key={elemental} />
            ))}

            <MonsterStunned />

            <MonsterStaggered />

            <MonsterBleeding />
          </Stack>
        </CardBody>
      </Card>
    );
  }
}
