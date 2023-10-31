import { useEffect, useState } from "react";
import { Stack, Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { QUEST_NOTIFICATION_DURATION } from "@neverquest/data/general";
import { QUESTS, QUEST_CLASS_ICONS } from "@neverquest/data/quests";
import { questNotification } from "@neverquest/state/quests";
import type { QuestData } from "@neverquest/types";
import { isConquest, isRoutine } from "@neverquest/types/type-guards";
import type { QuestClass } from "@neverquest/types/unions";

export function QuestNotifications() {
  const questNotificationValue = useRecoilValue(questNotification);
  const resetQuestNotification = useResetRecoilState(questNotification);

  const [questNotificationQueue, setQuestNotificationQueue] = useState<
    (QuestData & { isShowing: boolean; questClass: QuestClass })[]
  >([]);

  useEffect(() => {
    if (questNotificationValue === null) {
      return;
    }

    const { progression, quest } = questNotificationValue;
    const data = QUESTS[quest][progression];

    if (data === undefined) {
      return;
    }

    setQuestNotificationQueue((current) => [
      {
        ...data,
        isShowing: true,
        questClass: isConquest(quest) ? "conquest" : isRoutine(quest) ? "routine" : "triumph",
      },
      ...current,
    ]);

    return resetQuestNotification;
  }, [questNotificationValue, resetQuestNotification, setQuestNotificationQueue]);

  return (
    <ToastContainer className="mb-4" position="bottom-center">
      {questNotificationQueue.map(({ description, isShowing, questClass, title }, indexQueue) => (
        <Toast
          autohide
          delay={QUEST_NOTIFICATION_DURATION}
          key={title}
          onClose={() => {
            setQuestNotificationQueue((currentQueue) =>
              currentQueue.map((currentNotification, indexNotification) =>
                indexQueue === indexNotification
                  ? { ...currentNotification, isShowing: false }
                  : currentNotification,
              ),
            );

            resetQuestNotification();
          }}
          show={isShowing}
        >
          <ToastHeader>
            <Stack className="me-auto" direction="horizontal" gap={1}>
              <IconImage Icon={QUEST_CLASS_ICONS[questClass]} size="small" />

              {`Achieved: ${title}`}
            </Stack>
          </ToastHeader>

          <ToastBody>{description}</ToastBody>
        </Toast>
      ))}
    </ToastContainer>
  );
}
