import React from "react";
import { useRecoilValue } from "recoil";

import Card from "react-bootstrap/Card";

import Merchant from "components/Caravan/Merchant";
import Mercenary from "components/Caravan/Mercenary";
import { crew } from "state/atoms";

export default function Caravan() {
  const members = useRecoilValue(crew);
  const memberOrder = [
    {
      name: "merchant",
      Component: Merchant,
    },
    {
      name: "mercenary",
      Component: Mercenary,
    },
  ];

  return (
    <Card>
      <Card.Body>
        <div className="spaced">
          {memberOrder.map(
            ({ name, Component }) => members[name] && <Component />
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
