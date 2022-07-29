import { useAtomValue } from "jotai";
import { useState } from "react";
import { Card, Stack } from "react-bootstrap";

import DismissableScreen from "@neverquest/components/DismissableScreen";
import CrewHirable from "@neverquest/components/Caravan/CrewHirable";
import CrewHired from "@neverquest/components/Caravan/CrewHired";
import { crew } from "@neverquest/state/caravan";
import { CrewHireStatus, CrewType } from "@neverquest/types/enums";
import { AnimationType } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/helpers";
import { CREW_MEMBERS, CREW_ORDER } from "@neverquest/utilities/constants-caravan";

export default function Caravan() {
  const crewValue = useAtomValue(crew);
  const [currentMember, setCurrentMember] = useState<CrewType | null>(null);
  const [isScreenShowing, setScreenShowing] = useState(false);

  const hirableCrew = CREW_ORDER.filter(
    (type) => crewValue[type].hireStatus === CrewHireStatus.Hirable
  );

  const onActivate = (isShowing: boolean, member?: CrewType) => {
    setScreenShowing(isShowing);

    if (member) {
      setCurrentMember(member);
    } else {
      setCurrentMember(null);
    }
  };

  return (
    <>
      <Card className={getAnimationClass({ type: AnimationType.FlipInX })}>
        <Card.Body>
          <Stack gap={3}>
            {CREW_ORDER.map((type, index) => {
              const member = crewValue[type];

              if (member.hireStatus === CrewHireStatus.Hired) {
                return (
                  <CrewHired key={index} setActive={() => onActivate(true, type)} type={type} />
                );
              }

              return null;
            })}
          </Stack>

          {hirableCrew.length > 0 && (
            <>
              <hr />

              <Stack gap={3}>
                {hirableCrew.map((type, index) => (
                  <CrewHirable key={index} type={type} />
                ))}
              </Stack>
            </>
          )}
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
