import { Col, Row, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { AttackButton } from "@neverquest/components/Controls/AttackButton";
import { CapabilitiesButton } from "@neverquest/components/Controls/CapabilitiesButton";
import { CollectLootButton } from "@neverquest/components/Controls/CollectLootButton";
import { InventoryButton } from "@neverquest/components/Controls/InventoryButton";
import { RetireButton } from "@neverquest/components/Controls/RetireButton";
import { TravelButton } from "@neverquest/components/Controls/TravelButton";
import { Encounter } from "@neverquest/components/Encounter";
import { Essence } from "@neverquest/components/Essence";
import { Gear } from "@neverquest/components/Items/Gear";
import { Location } from "@neverquest/components/Location";
import { Masteries } from "@neverquest/components/Masteries";
import { Statistics } from "@neverquest/components/Statistics";
import { Status } from "@neverquest/components/Status";
import { WildernessStatus } from "@neverquest/components/Wilderness/WildernessStatus";
import { isGameOver } from "@neverquest/state/character";
import { isShowing } from "@neverquest/state/isShowing";
import { useRestart } from "@neverquest/state/seed";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

export function Layout() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const [isShowingGameOver, setIsShowingGameOver] = useRecoilState(isShowing("gameOver"));

  const restart = useRestart();

  return (
    <>
      <Row>
        <Col>
          <Stack gap={3}>
            <div className={CLASS_FULL_WIDTH_JUSTIFIED}>
              <Location />

              <Essence />
            </div>

            <Stack className="overlay-offcanvas" gap={3}>
              <Status />

              <Statistics />

              <Gear />

              <Masteries />
            </Stack>
          </Stack>
        </Col>

        <Col xs="auto">
          <Stack gap={3}>
            <RetireButton />

            <AttackButton />

            <CapabilitiesButton />

            <InventoryButton />

            <CollectLootButton />

            <TravelButton />
          </Stack>
        </Col>

        <Col>
          <Stack gap={3}>
            <WildernessStatus />

            <Encounter />
          </Stack>
        </Col>
      </Row>

      <ConfirmationDialog
        confirmationLabel="Restart"
        message="Start a new quest?"
        onConfirm={restart}
        setHidden={() => setIsShowingGameOver(false)}
        show={isGameOverValue && isShowingGameOver}
        title="Death has come."
      />
    </>
  );
}
