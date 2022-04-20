import { useState } from "react";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import Card from "react-bootstrap/Card";

import DismissableScreen from "neverquest/components/DismissableScreen";
import Member from "neverquest/components/Caravan/Member";
import Mercenary from "neverquest/components/Caravan/Mercenary";
import Merchant from "neverquest/components/Caravan/Merchant";
import { CrewType } from "neverquest/env";
import { crew, crewMonologues } from "neverquest/state/caravan";
import { name } from "neverquest/state/character";

interface CrewMember {
  name: string;
  content: JSX.Element;
  label: string;
  key: CrewType;
}

export default function Caravan() {
  const crewValue = useRecoilValue(crew);
  const crewMonologueValue = useRecoilValue(crewMonologues);
  const nameValue = useRecoilValue(name);
  const [currentMember, setCurrentMember] = useState<CrewMember>();
  const [isScreenShowing, setScreenShowing] = useState(false);

  const memberOrder = [
    {
      name: "Merchant",
      content: <Merchant />,
      key: CrewType.Merchant,
      label: "Trade",
      // TODO - change up monologue
      monologue: crewMonologueValue[CrewType.Merchant][0](nameValue),
    },
    {
      name: "Mercenary",
      content: <Mercenary />,
      key: CrewType.Mercenary,
      label: "Train",
      // TODO - change up monologue
      monologue: crewMonologueValue[CrewType.Mercenary][0](),
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
      <Card>
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
