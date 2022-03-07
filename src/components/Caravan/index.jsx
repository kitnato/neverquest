import { useState } from "react";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import Card from "react-bootstrap/Card";

import DismissableScreen from "components/DismissableScreen";
import Member from "components/Caravan/Member";
import Mercenary from "components/Caravan/Mercenary";
import Merchant from "components/Caravan/Merchant";
import { crew } from "state/caravan";

export default function Caravan() {
  const members = useRecoilValue(crew);
  const [currentMember, setCurrentMember] = useState({});
  const [isScreenShowing, setScreenShowing] = useState(false);

  const memberOrder = [
    {
      name: "Merchant",
      content: <Merchant />,
      label: "Trade",
      key: "merchant",
    },
    {
      name: "Mercenary",
      content: <Mercenary />,
      label: "Train",
      key: "mercenary",
    },
  ];

  const onActivate = (isShowing, member = {}) => {
    setScreenShowing(isShowing);
    setCurrentMember(member);
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

      <DismissableScreen
        content={currentMember.content}
        isShowing={isScreenShowing}
        onClose={() => onActivate(false)}
        title={currentMember.name}
      />
    </>
  );
}
