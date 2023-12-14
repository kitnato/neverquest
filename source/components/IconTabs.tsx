import { Nav, NavItem, NavLink, Stack, TabContainer, TabContent, TabPane } from "react-bootstrap";

import { IconImage } from "@neverquest/components/IconImage";
import type { TabsData } from "@neverquest/types/components";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function IconTabs({ tabs }: { tabs: TabsData }) {
  return (
    <TabContainer defaultActiveKey={tabs[0].label}>
      <Stack gap={1}>
        <Nav justify variant="pills">
          {tabs.map(({ Icon, label }) => (
            <NavItem key={label}>
              <NavLink eventKey={label}>
                <Stack
                  className="align-items-center justify-content-center"
                  direction="horizontal"
                  gap={3}
                >
                  <IconImage Icon={Icon} />

                  <span>{capitalizeAll(label)}</span>
                </Stack>
              </NavLink>
            </NavItem>
          ))}
        </Nav>

        <hr />

        <TabContent>
          {tabs.map(({ Component, label }) => (
            <TabPane eventKey={label} key={label}>
              <Component />
            </TabPane>
          ))}
        </TabContent>
      </Stack>
    </TabContainer>
  );
}
