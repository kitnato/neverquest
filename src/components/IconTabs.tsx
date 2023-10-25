import { Nav, Stack, Tab } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import type { TabsData } from "@neverquest/types/props";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function IconTabs({ tabs }: { tabs: TabsData }) {
  return (
    <Tab.Container defaultActiveKey={tabs[0].label}>
      <Nav justify variant="pills">
        {tabs.map(({ Icon, label }) => (
          <Nav.Item key={label}>
            <Nav.Link eventKey={label}>
              <Stack className="justify-content-center" direction="horizontal" gap={3}>
                <IconImage Icon={Icon} />

                <span>{capitalizeAll(label)}</span>
              </Stack>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>

      <Tab.Content>
        {tabs.map(({ Component, label }) => (
          <Tab.Pane eventKey={label} key={label}>
            <Stack gap={3}>
              <hr />

              <Stack gap={3}>
                <Component />
              </Stack>
            </Stack>
          </Tab.Pane>
        ))}
      </Tab.Content>
    </Tab.Container>
  );
}
