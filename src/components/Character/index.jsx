import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import WithIcon from "components/WithIcon";
import Armor from "components/Character/Armor";
import Attack from "components/Character/Attack";
import AttackButton from "components/Character/AttackButton";
import Block from "components/Character/Block";
import Damage from "components/Character/Damage";
import Dodge from "components/Character/Dodge";
import Experience from "components/Character/Experience";
import Health from "components/Character/Health";
import Name from "components/Character/Name";
import Regen from "components/Character/Regen";
import Resources from "components/Character/Resources";
import Stamina from "components/Character/Stamina";

import { health, healthRegen, stamina, staminaRegen } from "state/atoms";

export default function Character() {
  return (
    <Card>
      <Card.Body>
        <Name />

        <div className="mt-3">
          <Health />

          <WithIcon>
            <Regen resource={health} regen={healthRegen} />
          </WithIcon>
        </div>

        <div className="mt-3">
          <Stamina />

          <WithIcon>
            <Regen resource={stamina} regen={staminaRegen} />
          </WithIcon>
        </div>

        <Row className="mt-3">
          <Col>
            <Damage />
          </Col>

          <Col>
            <Armor />
          </Col>

          <Col>
            <Block />
          </Col>

          <Col>
            <Dodge />
          </Col>
        </Row>

        <div className="mt-3">
          <div className="mb-2">
            <Attack />
          </div>

          <AttackButton />
        </div>

        <Row className="mt-3">
          <Col>
            <Experience />
          </Col>

          <Resources />
        </Row>
      </Card.Body>
    </Card>
  );
}
