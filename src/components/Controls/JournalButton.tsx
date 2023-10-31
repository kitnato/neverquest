import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ButtonBadge } from "@neverquest/components/Controls/ButtonBadge";
import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { IconImage } from "@neverquest/components/IconImage";
import { Journal } from "@neverquest/components/Journal";
import IconAttention from "@neverquest/icons/attention.svg?react";
import IconJournal from "@neverquest/icons/journal.svg?react";
import { isAttacking } from "@neverquest/state/character";
import { isStageStarted } from "@neverquest/state/encounter";
import { ownedItem } from "@neverquest/state/items";
import { canCompleteQuests } from "@neverquest/state/quests";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function JournalButton() {
  const canCompleteQuestsValue = useRecoilValue(canCompleteQuests);
  const isAttackingValue = useRecoilValue(isAttacking);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const ownedItemJournal = useRecoilValue(ownedItem("journal"));

  const [isJournalOpenValue, setIsJournalOpen] = useState(false);

  if (ownedItemJournal === null) {
    return null;
  }

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Journal</Tooltip>}>
        <span className={getAnimationClass({ name: "bounceIn" })}>
          <Button
            className={`position-relative${
              canCompleteQuestsValue && !isStageStartedValue
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

            <ButtonBadge isShowing={canCompleteQuestsValue}>
              <IconImage Icon={IconAttention} size="small" />
            </ButtonBadge>
          </Button>
        </span>
      </OverlayTrigger>

      <DismissableScreen
        hideScroll
        isShowing={isJournalOpenValue}
        onClose={() => setIsJournalOpen(false)}
        title="Journal"
      >
        <Journal />
      </DismissableScreen>
    </>
  );
}
