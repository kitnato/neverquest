import { useState } from "react";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import Card from "react-bootstrap/Card";

import DismissableScreen from "neverquest/components/DismissableScreen";
import Member from "neverquest/components/Caravan/Member";
import Mercenary from "neverquest/components/Caravan/Mercenary";
import Merchant from "neverquest/components/Caravan/Merchant";
import { CrewType } from "neverquest/env.d";
import { crew } from "neverquest/state/caravan";

interface CrewMember {
  name: string;
  content: JSX.Element;
  label: string;
  key: CrewType;
}

export default function Caravan() {
  const members = useRecoilValue(crew);
  const [currentMember, setCurrentMember] = useState<CrewMember>();
  const [isScreenShowing, setScreenShowing] = useState(false);

  const memberOrder = [
    {
      name: "Merchant",
      content: <Merchant />,
      label: "Trade",
      key: CrewType.Merchant,
    },
    {
      name: "Mercenary",
      content: <Mercenary />,
      label: "Train",
      key: CrewType.Mercenary,
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
              ({ key, label, name }, index) =>
                members[key] && (
                  <Member
                    key={key}
                    label={label}
                    name={name}
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
