import { type FunctionComponent, useState } from "react";
import { Card, CardBody, Stack } from "react-bootstrap";
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
import { LABEL_NONE_AVAILABLE } from "@neverquest/data/general";
import { activeCrew, isCaravanHired } from "@neverquest/state/caravan";
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
  const [activeCrewValue, setCrewActive] = useRecoilState(activeCrew);
  const isCaravanHiredValue = useRecoilValue(isCaravanHired);
  const isShowingCrewHiring = useRecoilValue(isShowing("crewHiring"));

  const [isScreenShowing, setScreenShowing] = useState(false);

  const toggleCrewActive = (isShowing: boolean, member?: Crew) => {
    setScreenShowing(isShowing);
    setCrewActive(member ?? undefined);
  };

  return (
    <>
      <Card className={getAnimationClass({ name: "zoomIn", speed: "fast" })}>
        <CardBody>
          <Stack gap={5}>
            <Stack gap={3}>
              {isShowingCrewHiring && <h6>Hired crew</h6>}

              {CREW_ORDER.map((current, index) => (
                <CrewHired
                  crew={current}
                  key={index}
                  setActive={() => toggleCrewActive(true, current)}
                />
              ))}
            </Stack>

            {isShowingCrewHiring && (
              <Stack gap={3}>
                <h6>Crew for hire</h6>

                {isCaravanHiredValue && <span className="fst-italic">{LABEL_NONE_AVAILABLE}</span>}

                {CREW_ORDER.map((current, index) => (
                  <CrewHirable crew={current} key={index} />
                ))}
              </Stack>
            )}
          </Stack>
        </CardBody>
      </Card>

      {activeCrewValue !== undefined &&
        (() => {
          const Component = CREW_COMPONENTS[activeCrewValue];

          return (
            <DismissableScreen
              isShowing={isScreenShowing}
              onClose={() => toggleCrewActive(false)}
              title={capitalizeAll(activeCrewValue)}
            >
              <Component />
            </DismissableScreen>
          );
        })()}
    </>
  );
}
