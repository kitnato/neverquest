import { Card, Stack } from "react-bootstrap";

import { Defense } from "@neverquest/components/Statistics/Defense";
import { Offense } from "@neverquest/components/Statistics/Offense";
import { Support } from "@neverquest/components/Statistics/Support";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Statistics() {
  return (
    <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
      <Card.Body>
        <Stack gap={3}>
          <Offense />

          <Defense />

          <Support />
        </Stack>
      </Card.Body>
    </Card>
  );
}
