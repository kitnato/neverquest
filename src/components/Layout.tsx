import { Col, Row, Stack } from "react-bootstrap";

import { AttackButton } from "@neverquest/components/Controls/AttackButton";
import { CapabilitiesButton } from "@neverquest/components/Controls/CapabilitiesButton";
import { CollectLootButton } from "@neverquest/components/Controls/CollectLootButton";
import { InventoryButton } from "@neverquest/components/Controls/InventoryButton";
import { JournalButton } from "@neverquest/components/Controls/JournalButton";
import { RetireButton } from "@neverquest/components/Controls/RetireButton";
import { TravelButton } from "@neverquest/components/Controls/TravelButton";
import { Encounter } from "@neverquest/components/Encounter";
import { WildernessStatus } from "@neverquest/components/Encounter/WildernessStatus";
import { Essence } from "@neverquest/components/Essence";
import { GameOver } from "@neverquest/components/GameOver";
import { Gear } from "@neverquest/components/Inventory/Gear";
import { Location } from "@neverquest/components/Location";
import { Masteries } from "@neverquest/components/Masteries";
import { QuestNotifications } from "@neverquest/components/Quests/QuestNotifications";
import { Statistics } from "@neverquest/components/Statistics";
import { Status } from "@neverquest/components/Status";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general";

export function Layout() {
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

            <JournalButton />

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

      <GameOver />

      <QuestNotifications />
    </>
  );
}
