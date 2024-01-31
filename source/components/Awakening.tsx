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
      <CardBody className={getAnimationClass({ animation: "zoomIn" })}>
        <Stack className="align-items-center" gap={5}>
          <IconImage Icon={IconAwakening} />

          <Typewriter>... System failure. Patient 7 has bypassed the cipher. Protocol?</Typewriter>

          <Stack className="mx-auto" direction="horizontal" gap={3} style={{ width: 400 }}>
            <Button
              className="w-50"
              onClick={() => {
                setConsciousness("somnium");
                progressQuest({ quest: "deciding" });
              }}
              variant="outline-dark"
            >
              <span>Grind</span>
            </Button>

            <Button
              className="w-50"
              onClick={() => {
                setConsciousness("mors");
              }}
              variant="outline-dark"
            >
              <span>Die</span>
            </Button>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
}
