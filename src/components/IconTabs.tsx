import { Nav, Stack, TabContainer, TabContent, TabPane } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import type { TabsData } from "@neverquest/types/props";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function IconTabs({ tabs }: { tabs: TabsData }) {
  return (
    <TabContainer defaultActiveKey={tabs[0].label}>
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

      <TabContent>
        {tabs.map(({ Component, label }) => (
          <TabPane eventKey={label} key={label}>
            <Stack gap={3}>
              <hr />

              <Component />
            </Stack>
          </TabPane>
        ))}
      </TabContent>
    </TabContainer>
  );
}
