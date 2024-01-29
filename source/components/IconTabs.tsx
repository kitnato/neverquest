import type { SelectCallback } from "@restart/ui/types";
import { Nav, NavItem, NavLink, Stack, TabContainer, TabContent, TabPane } from "react-bootstrap";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import type { TabsData } from "@neverquest/types/components";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function IconTabs({
  activeKey,
  onSelect,
  tabs,
}: {
  activeKey?: string;
  onSelect?: SelectCallback;
  tabs: TabsData;
}) {
  return (
    <TabContainer activeKey={activeKey ?? tabs[0].label} onSelect={onSelect}>
      <Stack gap={1}>
        <Nav justify variant="pills">
          {tabs.map(({ Icon, label }) => (
            <NavItem key={label}>
              <NavLink className="d-flex justify-content-center" eventKey={label}>
                <IconDisplay Icon={Icon}>
                  <span>{capitalizeAll(label)}</span>
                </IconDisplay>
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
