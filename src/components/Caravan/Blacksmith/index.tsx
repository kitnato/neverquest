import { Nav, Stack, Tab } from "react-bootstrap";

import { WeaponOptions } from "@neverquest/components/Caravan/Blacksmith/WeaponOptions";
import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as IconWeapon } from "@neverquest/icons/axe-sword.svg";
import { ReactComponent as IconShield } from "@neverquest/icons/round-shield.svg";
import { ReactComponent as IconArmor } from "@neverquest/icons/shoulder-armor.svg";

enum TabKey {
  Armor,
  Shield,
  Weapon,
}

const DATA_TABS = [
  {
    Component: WeaponOptions,
    Icon: IconWeapon,
    key: TabKey.Weapon,
    label: "Weapon",
  },
  {
    Component: WeaponOptions,
    Icon: IconArmor,
    key: TabKey.Armor,
    label: "Armor",
  },
  {
    Component: WeaponOptions,
    Icon: IconShield,
    key: TabKey.Shield,
    label: "Shield",
  },
];

export function Blacksmith() {
  return (
    <Stack gap={3}>
      <Tab.Container defaultActiveKey={TabKey.Weapon}>
        <Nav justify variant="pills">
          {DATA_TABS.map(({ Icon, key, label }) => (
            <Nav.Item key={key}>
              <Nav.Link eventKey={key}>
                <IconImage Icon={Icon} /> {label}
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>

        <Tab.Content>
          {DATA_TABS.map(({ Component, key, label }) => (
            <Tab.Pane eventKey={key} key={key}>
              <Stack gap={3}>
                <h6>Craft {label.toLowerCase()}</h6>

                <Component />
              </Stack>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </Stack>
  );
}
