import { useEffect, useState } from "react";
import { Stack, Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LABEL_UNKNOWN, QUEST_NOTIFICATION_DURATION } from "@neverquest/data/general";
import { QUEST_CLASS_ICONS } from "@neverquest/data/quests";
import { questNotifications } from "@neverquest/state/quests";
import type { QuestData } from "@neverquest/types";

export function QuestNotifications() {
  const questNotificationsValue = useRecoilValue(questNotifications);
  const resetQuestNotifications = useResetRecoilState(questNotifications);

  const [questNotificationsQueue, setQuestNotificationsQueue] = useState<QuestData[]>([]);

  useEffect(() => {
    if (questNotificationsValue.length === 0) {
      return;
    }

    setQuestNotificationsQueue((currentQueue) => [
      ...questNotificationsValue.map((currentNotification) => currentNotification),
      ...currentQueue,
    ]);

    resetQuestNotifications();
  }, [questNotificationsValue, resetQuestNotifications, setQuestNotificationsQueue]);

  return (
    <ToastContainer className="mb-4" position="bottom-center">
      {questNotificationsQueue.map(({ description, hidden, questClass, title }, indexQueue) => (
        <Toast
          autohide
          delay={QUEST_NOTIFICATION_DURATION}
          key={title}
          onClose={() =>
            setQuestNotificationsQueue((currentQueue) =>
              currentQueue.filter((_, indexNotification) => indexQueue !== indexNotification),
            )
          }
          show
        >
          <ToastHeader>
            <Stack className="me-auto" direction="horizontal" gap={1}>
              <IconImage Icon={QUEST_CLASS_ICONS[questClass]} size="small" />

              {title}
            </Stack>
          </ToastHeader>

          <ToastBody>
            {hidden !== undefined ? description.replace(LABEL_UNKNOWN, hidden) : description}
          </ToastBody>
        </Toast>
      ))}
    </ToastContainer>
  );
}
