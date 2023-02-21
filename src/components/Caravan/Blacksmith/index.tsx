import { Nav, Stack, Tab } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconWeapon } from "@neverquest/icons/axe-sword.svg";
import { ReactComponent as IconShield } from "@neverquest/icons/round-shield.svg";
import { ReactComponent as IconArmor } from "@neverquest/icons/shoulder-armor.svg";

enum TabKey {
  Armor,
  Shield,
  Weapon,
}

export function Blacksmith() {
  return (
    <Stack gap={3}>
      <Tab.Container defaultActiveKey={TabKey.Weapon}>
        <Nav justify variant="pills">
          <Nav.Item>
            <Nav.Link eventKey={TabKey.Weapon}>
              <IconImage Icon={IconWeapon} /> Weapon
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey={TabKey.Armor}>
              <IconImage Icon={IconArmor} /> Armor
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey={TabKey.Shield}>
              <IconImage Icon={IconShield} /> Shield
            </Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey={TabKey.Weapon}>
            <h6>Craft weapon</h6>
          </Tab.Pane>

          <Tab.Pane eventKey={TabKey.Armor}>
            <h6>Craft armor</h6>
          </Tab.Pane>

          <Tab.Pane eventKey={TabKey.Shield}>
            <h6>Craft shield</h6>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Stack>
  );
}
