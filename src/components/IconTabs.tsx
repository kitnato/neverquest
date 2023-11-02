import { Nav, Stack, TabContainer, TabContent, TabPane } from "react-bootstrap";

import { IconBadge } from "@neverquest/components/IconBadge";
import { IconImage } from "@neverquest/components/IconImage";
import IconAttention from "@neverquest/icons/attention.svg?react";
import type { TabsData } from "@neverquest/types/props";
import { capitalizeAll } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function IconTabs({ tabs }: { tabs: TabsData }) {
  return (
    <TabContainer defaultActiveKey={tabs[0].label}>
      <Nav justify variant="pills">
        {tabs.map(({ hasWarningBadge, Icon, label }) => (
          <Nav.Item key={label}>
            <Nav.Link eventKey={label}>
              <Stack className="justify-content-center" direction="horizontal" gap={3}>
                <IconImage Icon={Icon} />

                <Stack direction="horizontal" gap={1}>
                  <span>{capitalizeAll(label)}</span>

                  {Boolean(hasWarningBadge) && (
                    <div
                      className={getAnimationClass({
                        isInfinite: true,
                        name: "pulse",
                      })}
                    >
                      <IconBadge>
                        <IconImage Icon={IconAttention} size="small" />
                      </IconBadge>
                    </div>
                  )}
                </Stack>
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
