import { Nav, Stack, Tab } from "react-bootstrap";

import { ArmorOptions } from "@neverquest/components/Caravan/Blacksmith/ArmorOptions";
import { WeaponOptions } from "@neverquest/components/Caravan/Blacksmith/WeaponOptions";
import { IconImage } from "@neverquest/components/IconImage";
import { ARMOR_ICON, SHIELD_ICON, WEAPON_ICON } from "@neverquest/data/gear";

enum TabKey {
  Armor,
  Shield,
  Weapon,
}

const DATA_TABS = [
  {
    Component: WeaponOptions,
    Icon: WEAPON_ICON,
    key: TabKey.Weapon,
    label: "Weapon",
  },
  {
    Component: ArmorOptions,
    Icon: ARMOR_ICON,
    key: TabKey.Armor,
    label: "Armor",
  },
  {
    // TODO
    Component: () => null,
    Icon: SHIELD_ICON,
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
          {DATA_TABS.map(({ Component, key }) => (
            <Tab.Pane eventKey={key} key={key}>
              <Stack gap={3}>
                <hr />

                <Stack className="mx-auto w-50" gap={3}>
                  <Component />
                </Stack>
              </Stack>
            </Tab.Pane>
          ))}
        </Tab.Content>
      </Tab.Container>
    </Stack>
  );
}
