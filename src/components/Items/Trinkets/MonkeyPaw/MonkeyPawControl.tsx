import { useState } from "react";
import { Button, Modal, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { MonkeyPawInfusion } from "@neverquest/components/Items/Trinkets/MonkeyPaw/MonkeyPawInfusion";
import { MonkeyPawInfusionMeter } from "@neverquest/components/Items/Trinkets/MonkeyPaw/MonkeyPawInfusionMeter";
import { MonkeyPawLevel } from "@neverquest/components/Items/Trinkets/MonkeyPaw/MonkeyPawLevel";
import { EssenceBonus } from "@neverquest/components/Statistics/EssenceBonus";
import { TRINKETS } from "@neverquest/data/inventory";
import { canAffordInfusion } from "@neverquest/state/items";
import { LABEL_NO_ESSENCE } from "@neverquest/utilities/constants";

export function MonkeyPawControl() {
  const canAffordInfusionValue = useRecoilValue(canAffordInfusion);

  const [isShowingInfusion, setIsShowingInfusion] = useState(false);

  const { Icon } = TRINKETS["monkey paw"];

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip>{LABEL_NO_ESSENCE}</Tooltip>}
        trigger={canAffordInfusionValue ? [] : ["focus", "hover"]}
      >
        <span>
          <Button
            disabled={!canAffordInfusionValue}
            onClick={() => setIsShowingInfusion(true)}
            variant="outline-dark"
          >
            Inspect
          </Button>
        </span>
      </OverlayTrigger>

      <Modal centered onHide={() => setIsShowingInfusion(false)} show={isShowingInfusion}>
        <Modal.Header closeButton>
          <Modal.Title>
            <Stack direction="horizontal" gap={3}>
              <IconImage Icon={Icon} />
              Essence infusion
            </Stack>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Stack gap={3}>
            <EssenceBonus />

            <Stack className="w-100" direction="horizontal" gap={3}>
              <MonkeyPawLevel />

              <MonkeyPawInfusionMeter />

              <MonkeyPawInfusion />
            </Stack>
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
}
