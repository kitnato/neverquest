import { Nav, NavItem, NavLink, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconBadge } from "@neverquest/components/IconBadge";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import IconAttention from "@neverquest/icons/attention.svg?react";
import { canCompleteQuests } from "@neverquest/state/quests";
import type { TabsData } from "@neverquest/types/components";
import { capitalizeAll } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function QuestTabsNav({ tabs }: { tabs: TabsData }) {
  const canCompleteConquests = useRecoilValue(canCompleteQuests("conquest"));
  const canCompleteRoutines = useRecoilValue(canCompleteQuests("routine"));
  const canCompleteTriumphs = useRecoilValue(canCompleteQuests("triumph"));

  return (
    <Nav justify variant="pills">
      {tabs.map(({ Icon, label }) => (
        <NavItem key={label}>
          <NavLink className="d-flex justify-content-center" eventKey={label}>
            <IconDisplay Icon={Icon}>
              <Stack direction="horizontal" gap={2}>
                <span>{capitalizeAll(label)}</span>

                {((label === "conquests" && canCompleteConquests) ||
                  (label === "routines" && canCompleteRoutines) ||
                  (label === "triumphs" && canCompleteTriumphs)) && (
                  <div
                    className={getAnimationClass({
                      animation: "pulse",
                      isInfinite: true,
                    })}
                  >
                    <IconBadge>
                      <IconImage className="small" Icon={IconAttention} />
                    </IconBadge>
                  </div>
                )}
              </Stack>
            </IconDisplay>
          </NavLink>
        </NavItem>
      ))}
    </Nav>
  );
}
