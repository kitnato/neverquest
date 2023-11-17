import { Button, Card, CardBody, Stack } from "react-bootstrap";
import { useSetRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { Typewriter } from "@neverquest/components/Typewriter";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import IconAwakening from "@neverquest/icons/awakening.svg?react";
import { consciousness } from "@neverquest/state/encounter";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Awakening() {
  const setConsciousness = useSetRecoilState(consciousness);

  const progressQuest = useProgressQuest();

  return (
    <Card>
      <CardBody className={getAnimationClass({ name: "zoomIn" })}>
        <Stack className="align-items-center" gap={5}>
          <IconImage Icon={IconAwakening} />

          <Typewriter>... System failure. Patient has awoken. Protocol?</Typewriter>

          <Stack className="justify-content-center" direction="horizontal" gap={3}>
            <Button
              onClick={() => {
                setConsciousness("asleep");
                progressQuest({ quest: "deciding" });
              }}
              variant="outline-dark"
            >
              Keep grinding
            </Button>

            <Button onClick={() => setConsciousness("dead")} variant="outline-dark">
              Die forever
            </Button>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
}
