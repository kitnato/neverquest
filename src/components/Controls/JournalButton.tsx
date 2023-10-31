import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { IconBadge } from "@neverquest/components/IconBadge";
import { IconImage } from "@neverquest/components/IconImage";
import { Journal } from "@neverquest/components/Quests";
import IconAttention from "@neverquest/icons/attention.svg?react";
import IconJournal from "@neverquest/icons/journal.svg?react";
import { isAttacking } from "@neverquest/state/character";
import { isStageStarted } from "@neverquest/state/encounter";
import { ownedItem } from "@neverquest/state/items";
import { canCompleteQuests } from "@neverquest/state/quests";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function JournalButton() {
  const canCompleteConquests = useRecoilValue(canCompleteQuests("conquest"));
  const canCompleteRoutines = useRecoilValue(canCompleteQuests("routine"));
  const canCompleteTriumphs = useRecoilValue(canCompleteQuests("triumph"));
  const isAttackingValue = useRecoilValue(isAttacking);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const ownedItemJournal = useRecoilValue(ownedItem("journal"));

  const [isJournalOpenValue, setIsJournalOpen] = useState(false);

  const canCompleteQuest = canCompleteConquests || canCompleteRoutines || canCompleteTriumphs;

  if (ownedItemJournal === null) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Journal</Tooltip>}>
        <span className={getAnimationClass({ name: "bounceIn" })}>
          <Button
            className={`position-relative${
              canCompleteQuest && !isStageStartedValue
                ? ` ${getAnimationClass({
                    isInfinite: true,
                    name: "pulse",
                  })}`
                : ""
            }`}
            disabled={isAttackingValue}
            onClick={() => setIsJournalOpen(true)}
            variant="outline-dark"
          >
            <IconImage Icon={IconJournal} />

            {canCompleteQuest && (
              <IconBadge alignToButton>
                <IconImage Icon={IconAttention} size="small" />
              </IconBadge>
            )}
          </Button>
        </span>
      </OverlayTrigger>

      <DismissableScreen
        hideOverflow
        isShowing={isJournalOpenValue}
        onClose={() => setIsJournalOpen(false)}
        title="Journal"
      >
        <Journal />
      </DismissableScreen>
    </>
  );
}
