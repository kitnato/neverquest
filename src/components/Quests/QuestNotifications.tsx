import { useEffect } from "react";
import { Stack, Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap";
import { useRecoilState, useResetRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LABEL_UNKNOWN, QUEST_NOTIFICATION_DURATION } from "@neverquest/data/general";
import { QUEST_CLASS_ICONS } from "@neverquest/data/quests";
import { questNotifications } from "@neverquest/state/quests";

export function QuestNotifications() {
  const [questNotificationsValue, setQuestNotifications] = useRecoilState(questNotifications);
  const resetQuestNotifications = useResetRecoilState(questNotifications);

  useEffect(() => resetQuestNotifications, [resetQuestNotifications]);

  return (
    <ToastContainer className="mb-4" position="bottom-center">
      {questNotificationsValue.map(
        ({ description, hidden, ID: questNotificationOuterID, questClass, title }) => (
          <Toast
            autohide
            delay={QUEST_NOTIFICATION_DURATION}
            key={questNotificationOuterID}
            onClose={() =>
              setQuestNotifications((currentQueue) =>
                currentQueue.filter(
                  ({ ID: questNotificationInnerID }) =>
                    questNotificationOuterID !== questNotificationInnerID,
                ),
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
        ),
      )}
    </ToastContainer>
  );
}
