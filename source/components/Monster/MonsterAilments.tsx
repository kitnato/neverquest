import { Card, CardBody, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Bleeding } from "@neverquest/components/Monster/Bleeding";
import { MonsterElementalAilment } from "@neverquest/components/Monster/MonsterElementalAilment";
import { Staggered } from "@neverquest/components/Monster/Staggered";
import { Stunned } from "@neverquest/components/Monster/Stunned";
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

            <Stunned />

            <Staggered />

            <Bleeding />
          </Stack>
        </CardBody>
      </Card>
    );
  }
}
