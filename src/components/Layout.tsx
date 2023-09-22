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
import { Gear } from "@neverquest/components/Items/Gear";
import { Location } from "@neverquest/components/Location";
import { Masteries } from "@neverquest/components/Masteries";
import { Resources } from "@neverquest/components/Resources";
import { Statistics } from "@neverquest/components/Statistics";
import { Status } from "@neverquest/components/Status";
import { WildernessStatus } from "@neverquest/components/Wilderness/WildernessStatus";
import { isGameOver } from "@neverquest/state/character";
import { isShowing } from "@neverquest/state/isShowing";
import { useRestart } from "@neverquest/state/seed";

export function Layout() {
  const isGameOverValue = useRecoilValue(isGameOver);
  const [isShowingGameOver, setIsShowingGameOver] = useRecoilState(isShowing("gameOver"));

  const restart = useRestart();

  return (
    <>
      <Row>
        <Col>
          <Stack gap={3}>
            <Location />

            <Stack className="overlay-highlighted" gap={3}>
              <Status />

              <Statistics />

              <Gear />

              <Resources />
            </Stack>

            <Masteries />
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
