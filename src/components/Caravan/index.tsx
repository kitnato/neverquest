import { type FunctionComponent, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { Alchemist } from "@neverquest/components/Caravan/Alchemist";
import { Blacksmith } from "@neverquest/components/Caravan/Blacksmith";
import { CrewHirable } from "@neverquest/components/Caravan/CrewHirable";
import { CrewHired } from "@neverquest/components/Caravan/CrewHired";
import { Fletcher } from "@neverquest/components/Caravan/Fletcher";
import { Medic } from "@neverquest/components/Caravan/Medic";
import { Mercenary } from "@neverquest/components/Caravan/Mercenary";
import { Merchant } from "@neverquest/components/Caravan/Merchant";
import { Occultist } from "@neverquest/components/Caravan/Occultist";
import { Tailor } from "@neverquest/components/Caravan/Tailor";
import { Witch } from "@neverquest/components/Caravan/Witch";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { CREW_ORDER } from "@neverquest/data/caravan";
import { crewActive, isCrewHired } from "@neverquest/state/caravan";
import { isShowing } from "@neverquest/state/isShowing";
import type { Crew } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

const CREW_COMPONENTS: Record<Crew, FunctionComponent> = {
  alchemist: Alchemist,
  blacksmith: Blacksmith,
  fletcher: Fletcher,
  medic: Medic,
  mercenary: Mercenary,
  merchant: Merchant,
  occultist: Occultist,
  tailor: Tailor,
  witch: Witch,
};

export function Caravan() {
  const [crewActiveValue, setCrewActive] = useRecoilState(crewActive);
  const isCrewHiredValue = useRecoilValue(isCrewHired);
  const isShowingCrewHiring = useRecoilValue(isShowing("crewHiring"));

  const [isScreenShowing, setScreenShowing] = useState(false);

  const toggleCrewActive = (isShowing: boolean, member?: Crew) => {
    setScreenShowing(isShowing);
    setCrewActive(member ?? null);
  };

  return (
    <>
      <Card className={getAnimationClass({ speed: "fast", type: "zoomIn" })}>
        <Card.Body>
          <Stack gap={5}>
            <Stack gap={3}>
              {isShowingCrewHiring && <h6>Hired crew</h6>}

              {CREW_ORDER.map((current, index) => (
                <CrewHired
                  key={index}
                  setActive={() => toggleCrewActive(true, current)}
                  type={current}
                />
              ))}
            </Stack>

            {isShowingCrewHiring && (
              <Stack gap={3}>
                <h6>Crew for hire</h6>

                {isCrewHiredValue && <span className="fst-italic">None available.</span>}

                {CREW_ORDER.map((current, index) => (
                  <CrewHirable key={index} type={current} />
                ))}
              </Stack>
            )}
          </Stack>
        </Card.Body>
      </Card>

      {crewActiveValue !== null &&
        (() => {
          const Component = CREW_COMPONENTS[crewActiveValue];

          return (
            <DismissableScreen
              isShowing={isScreenShowing}
              onClose={() => toggleCrewActive(false)}
              title={capitalizeAll(crewActiveValue)}
            >
              <Component />
            </DismissableScreen>
          );
        })()}
    </>
  );
}
