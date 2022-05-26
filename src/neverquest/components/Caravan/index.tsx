import { useAtomValue } from "jotai";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";

import DismissableScreen from "neverquest/components/DismissableScreen";
import Member from "neverquest/components/Caravan/Member";
import Mercenary from "neverquest/components/Caravan/Mercenary";
import Merchant from "neverquest/components/Caravan/Merchant";
import { crew, crewMonologues } from "neverquest/state/caravan";
import { CrewType } from "neverquest/types/core";
import { AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

interface CrewMember {
  name: string;
  content: JSX.Element;
  label: string;
  key: CrewType;
}

export default function Caravan() {
  const crewValue = useAtomValue(crew);
  const crewMonologueValue = useAtomValue(crewMonologues);
  const [currentMember, setCurrentMember] = useState<CrewMember>();
  const [isScreenShowing, setScreenShowing] = useState(false);

  const memberOrder = [
    {
      name: "Merchant",
      content: <Merchant />,
      key: CrewType.Merchant,
      label: "Trade",
      // TODO - change up monologue
      monologue: crewMonologueValue[CrewType.Merchant],
    },
    {
      name: "Mercenary",
      content: <Mercenary />,
      key: CrewType.Mercenary,
      label: "Train",
      // TODO - change up monologue
      monologue: crewMonologueValue[CrewType.Mercenary],
    },
  ];

  const onActivate = (isShowing: boolean, member?: CrewMember) => {
    setScreenShowing(isShowing);

    if (member) {
      setCurrentMember(member);
    }
  };

  return (
    <>
      <Card className={getAnimationClass(AnimationType.FlipInX)}>
        <Card.Body>
          <Stack gap={3}>
            {memberOrder.map(
              ({ key, ...member }, index) =>
                crewValue[key] && (
                  <Member
                    {...member}
                    key={key}
                    setActive={() => onActivate(true, memberOrder[index])}
                  />
                )
            )}
          </Stack>
        </Card.Body>
      </Card>

      {currentMember && (
        <DismissableScreen
          content={currentMember.content}
          isShowing={isScreenShowing}
          onClose={() => onActivate(false)}
          title={currentMember.name}
        />
      )}
    </>
  );
}
