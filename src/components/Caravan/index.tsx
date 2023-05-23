import { useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { CrewHirable } from "@neverquest/components/Caravan/CrewHirable";
import { CrewHired } from "@neverquest/components/Caravan/CrewHired";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { CREW, CREW_ORDER } from "@neverquest/data/caravan";
import { crewActive, crewHirable } from "@neverquest/state/caravan";
import { isShowing } from "@neverquest/state/isShowing";
import { type CrewMember, ShowingType } from "@neverquest/types/enums";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function Caravan() {
  const [crewActiveValue, setCrewActive] = useRecoilState(crewActive);
  const crewHirableValue = useRecoilValue(crewHirable);
  const isShowingCrewHiring = useRecoilValue(isShowing(ShowingType.CrewHiring));

  const [isScreenShowing, setScreenShowing] = useState(false);

  const toggleCrewActive = (isShowing: boolean, member?: CrewMember) => {
    setScreenShowing(isShowing);
    setCrewActive(member ?? null);
  };

  return (
    <>
      <Card className={getAnimationClass({ type: "flipInX" })}>
        <Card.Body>
          <Stack gap={5}>
            <Stack gap={3}>
              {isShowingCrewHiring && <h6>Hired crew</h6>}

              {CREW_ORDER.map((type, index) => (
                <CrewHired key={index} setActive={() => toggleCrewActive(true, type)} type={type} />
              ))}
            </Stack>

            {isShowingCrewHiring && (
              <Stack gap={3}>
                <h6>Crew for hire</h6>

                {crewHirableValue.length === 0 && (
                  <span className="fst-italic">None available.</span>
                )}

                {CREW_ORDER.map((type, index) => (
                  <CrewHirable key={index} type={type} />
                ))}
              </Stack>
            )}
          </Stack>
        </Card.Body>
      </Card>

      {crewActiveValue !== null &&
        (() => {
          const { Component, name } = CREW[crewActiveValue];

          return (
            <DismissableScreen
              isShowing={isScreenShowing}
              onClose={() => toggleCrewActive(false)}
              title={name}
            >
              <Component />
            </DismissableScreen>
          );
        })()}
    </>
  );
}
