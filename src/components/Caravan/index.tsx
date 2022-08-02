import { useRecoilValue } from "recoil";
import { useState } from "react";
import { Card, Stack } from "react-bootstrap";

import DismissableScreen from "@neverquest/components/DismissableScreen";
import CrewHirable from "@neverquest/components/Caravan/CrewHirable";
import CrewHired from "@neverquest/components/Caravan/CrewHired";
import { crewHirable } from "@neverquest/state/caravan";
import { isShowing } from "@neverquest/state/isShowing";
import { CrewType, ShowingType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";
import { CREW_MEMBERS, CREW_ORDER } from "@neverquest/utilities/constants-caravan";

export default function Caravan() {
  const crewHirableValue = useRecoilValue(crewHirable);
  const isShowingCrewHiring = useRecoilValue(isShowing(ShowingType.CrewHiring));

  const [currentMember, setCurrentMember] = useState<CrewType | null>(null);
  const [isScreenShowing, setScreenShowing] = useState(false);

  const onActivate = (isShowing: boolean, member?: CrewType) => {
    setScreenShowing(isShowing);
    setCurrentMember(member ?? null);
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

      {currentMember && (
        <DismissableScreen
          contents={CREW_MEMBERS[currentMember].Component()}
          isShowing={isScreenShowing}
          onClose={() => onActivate(false)}
          title={CREW_MEMBERS[currentMember].name}
        />
      )}
    </>
  );
}
