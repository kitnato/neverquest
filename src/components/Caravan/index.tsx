import { FunctionComponent, useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import Blacksmith from "@neverquest/components/Caravan/Blacksmith";
import Cook from "@neverquest/components/Caravan/Cook";
import CrewHirable from "@neverquest/components/Caravan/CrewHirable";
import CrewHired from "@neverquest/components/Caravan/CrewHired";
import Medic from "@neverquest/components/Caravan/Medic";
import Mercenary from "@neverquest/components/Caravan/Mercenary";
import Merchant from "@neverquest/components/Caravan/Merchant";
import Tailor from "@neverquest/components/Caravan/Tailor";
import DismissableScreen from "@neverquest/components/DismissableScreen";
import { CREW_MEMBERS, CREW_ORDER } from "@neverquest/data/caravan";
import { crewHirable } from "@neverquest/state/caravan";
import { isShowing } from "@neverquest/state/isShowing";
import { CrewType, ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export default function () {
  const crewHirableValue = useRecoilValue(crewHirable);
  const isShowingCrewHiring = useRecoilValue(isShowing(ShowingType.CrewHiring));

  const [activeMember, setActiveMember] = useState<CrewType | null>(null);
  const [isScreenShowing, setScreenShowing] = useState(false);

  const ActiveMemberComponent: FunctionComponent = (() => {
    if (activeMember) {
      switch (CREW_MEMBERS[activeMember].name) {
        case CREW_MEMBERS[CrewType.Blacksmith].name: {
          return Blacksmith;
        }
        case CREW_MEMBERS[CrewType.Cook].name: {
          return Cook;
        }
        case CREW_MEMBERS[CrewType.Medic].name: {
          return Medic;
        }
        case CREW_MEMBERS[CrewType.Mercenary].name: {
          return Mercenary;
        }
        case CREW_MEMBERS[CrewType.Merchant].name: {
          return Merchant;
        }
        case CREW_MEMBERS[CrewType.Tailor].name: {
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
    setActiveMember(member ?? null);
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

      {activeMember && (
        <DismissableScreen
          contents={<ActiveMemberComponent />}
          isShowing={isScreenShowing}
          onClose={() => onActivate(false)}
          title={CREW_MEMBERS[activeMember].name}
        />
      )}
    </>
  );
}
