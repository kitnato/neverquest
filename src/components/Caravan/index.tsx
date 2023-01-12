import { FunctionComponent, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import Blacksmith from "@neverquest/components/Caravan/Blacksmith";
import Cook from "@neverquest/components/Caravan/Cook";
import CrewHirable from "@neverquest/components/Caravan/CrewHirable";
import CrewHired from "@neverquest/components/Caravan/CrewHired";
import Medic from "@neverquest/components/Caravan/Medic";
import Mercenary from "@neverquest/components/Caravan/Mercenary";
import Merchant from "@neverquest/components/Caravan/Merchant";
import Tailor from "@neverquest/components/Caravan/Tailor";
import DismissableScreen from "@neverquest/components/DismissableScreen";
import { CREW, CREW_ORDER } from "@neverquest/data/caravan";
import { crewActive, crewHirable } from "@neverquest/state/caravan";
import { isShowing } from "@neverquest/state/isShowing";
import { CrewType, ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export default function () {
  const [crewActiveValue, setCrewActive] = useRecoilState(crewActive);
  const crewHirableValue = useRecoilValue(crewHirable);
  const isShowingCrewHiring = useRecoilValue(isShowing(ShowingType.CrewHiring));

  const [isScreenShowing, setScreenShowing] = useState(false);

  const ActiveMemberComponent: FunctionComponent = (() => {
    if (crewActiveValue) {
      switch (CREW[crewActiveValue].name) {
        case CREW[CrewType.Blacksmith].name: {
          return Blacksmith;
        }
        case CREW[CrewType.Cook].name: {
          return Cook;
        }
        case CREW[CrewType.Medic].name: {
          return Medic;
        }
        case CREW[CrewType.Mercenary].name: {
          return Mercenary;
        }
        case CREW[CrewType.Merchant].name: {
          return Merchant;
        }
        case CREW[CrewType.Tailor].name: {
          return Tailor;
        }
        default: {
          return () => null;
        }
      }
    }

    return () => null;
  })();

  const onActivate = (isShowing: boolean, member?: CrewType) => {
    setScreenShowing(isShowing);
    setCrewActive(member ?? null);
  };

  return (
    <>
      <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
        <Card.Body>
          <Stack gap={5}>
            <Stack gap={3}>
              {isShowingCrewHiring && <h6>Hired crew</h6>}

              {CREW_ORDER.map((type, index) => (
                <CrewHired key={index} setActive={() => onActivate(true, type)} type={type} />
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

      {crewActiveValue && (
        <DismissableScreen
          contents={<ActiveMemberComponent />}
          isShowing={isScreenShowing}
          onClose={() => onActivate(false)}
          title={CREW[crewActiveValue].name}
        />
      )}
    </>
  );
}
