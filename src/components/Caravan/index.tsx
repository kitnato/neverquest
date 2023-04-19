import { type FunctionComponent, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { Alchemist } from "@neverquest/components/Caravan/Alchemist";
import { Blacksmith } from "@neverquest/components/Caravan/Blacksmith";
import { CrewHirable } from "@neverquest/components/Caravan/CrewHirable";
import { CrewHired } from "@neverquest/components/Caravan/CrewHired";
import { Medic } from "@neverquest/components/Caravan/Medic";
import { Mercenary } from "@neverquest/components/Caravan/Mercenary";
import { Merchant } from "@neverquest/components/Caravan/Merchant";
import { Tailor } from "@neverquest/components/Caravan/Tailor";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { CREW, CREW_ORDER } from "@neverquest/data/caravan";
import { crewActive, crewHirable } from "@neverquest/state/caravan";
import { isShowing } from "@neverquest/state/isShowing";
import { CrewMember, ShowingType } from "@neverquest/types/enums";

import { getAnimationClass } from "@neverquest/utilities/getters";

export function Caravan() {
  const [crewActiveValue, setCrewActive] = useRecoilState(crewActive);
  const crewHirableValue = useRecoilValue(crewHirable);
  const isShowingCrewHiring = useRecoilValue(isShowing(ShowingType.CrewHiring));

  const [isScreenShowing, setScreenShowing] = useState(false);

  const ActiveMemberComponent: FunctionComponent = (() => {
    switch (crewActiveValue) {
      case CrewMember.Alchemist: {
        return Alchemist;
      }
      case CrewMember.Blacksmith: {
        return Blacksmith;
      }
      case CrewMember.Medic: {
        return Medic;
      }
      case CrewMember.Mercenary: {
        return Mercenary;
      }
      case CrewMember.Merchant: {
        return Merchant;
      }
      case CrewMember.Tailor: {
        return Tailor;
      }
      default: {
        return () => null;
      }
    }
  })();

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

      {crewActiveValue !== null && (
        <DismissableScreen
          contents={<ActiveMemberComponent />}
          isShowing={isScreenShowing}
          onClose={() => toggleCrewActive(false)}
          title={CREW[crewActiveValue].name}
        />
      )}
    </>
  );
}
