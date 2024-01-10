import { useState } from "react";
import { Badge, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DismissableScreen } from "@neverquest/components/DismissableScreen";
import { IconImage } from "@neverquest/components/IconImage";
import { Quests } from "@neverquest/components/Quests";
import IconAttention from "@neverquest/icons/attention.svg?react";
import IconJournal from "@neverquest/icons/journal.svg?react";
import { isAttacking } from "@neverquest/state/character";
import { isStageStarted } from "@neverquest/state/encounter";
import { ownedItem } from "@neverquest/state/inventory";
import { canCompleteQuests } from "@neverquest/state/quests";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Journal() {
  const canCompleteConquests = useRecoilValue(canCompleteQuests("conquest"));
  const canCompleteRoutines = useRecoilValue(canCompleteQuests("routine"));
  const canCompleteTriumphs = useRecoilValue(canCompleteQuests("triumph"));
  const isAttackingValue = useRecoilValue(isAttacking);
  const isStageStartedValue = useRecoilValue(isStageStarted);
  const ownedItemJournal = useRecoilValue(ownedItem("journal"));

  const [isJournalOpenValue, setIsJournalOpen] = useState(false);

  const canCompleteQuest = canCompleteConquests || canCompleteRoutines || canCompleteTriumphs;

  if (ownedItemJournal !== undefined) {
    return (
      <>
        <OverlayTrigger overlay={<Tooltip>Journal</Tooltip>}>
          <div className={getAnimationClass({ animation: "bounceIn" })}>
            <Button
              className={`position-relative${
                canCompleteQuest && !isStageStartedValue
                  ? ` ${getAnimationClass({
                      animation: "pulse",
                      isInfinite: true,
                    })}`
                  : ""
              }`}
              disabled={isAttackingValue}
              onClick={() => {
                setIsJournalOpen(true);
              }}
              variant="outline-dark"
            >
              <IconImage Icon={IconJournal} />

              {canCompleteQuest && (
                <Badge
                  bg="secondary"
                  className="position-absolute top-50 start-100 translate-middle"
                >
                  <IconImage className="small" Icon={IconAttention} />
                </Badge>
              )}
            </Button>
          </div>
        </OverlayTrigger>

        <DismissableScreen
          hideOverflow
          isShowing={isJournalOpenValue}
          onClose={() => {
            setIsJournalOpen(false);
          }}
          title="Journal"
        >
          <Quests />
        </DismissableScreen>
      </>
    );
  }
}
