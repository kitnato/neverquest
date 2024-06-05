import { Toast, ToastBody, ToastContainer, ToastHeader } from "react-bootstrap"
import { useRecoilState, useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LABEL_UNKNOWN } from "@neverquest/data/general"
import { QUEST_CLASS_ICONS, QUEST_NOTIFICATION_DURATION } from "@neverquest/data/quests"
import { canTrackQuests, questNotifications } from "@neverquest/state/quests"

export function QuestNotifications() {
	const [questNotificationsValue, setQuestNotifications] = useRecoilState(questNotifications)
	const canTrackQuestsValue = useRecoilValue(canTrackQuests)

	if (canTrackQuestsValue) {
		return (
			<ToastContainer className="mb-4" position="bottom-center">
				{questNotificationsValue.map(
					({ description, hidden, ID: outerID, questClass, title }) => (
						<Toast
							autohide
							delay={QUEST_NOTIFICATION_DURATION}
							key={outerID}
							onClose={() => {
								setQuestNotifications(queue => queue.filter(({ ID: innerID }) => outerID !== innerID))
							}}
							show
						>
							<ToastHeader>
								<IconDisplay
									className="me-auto"
									Icon={QUEST_CLASS_ICONS[questClass]}
									iconProps={{ className: "small" }}
								>
									<span>{title}</span>
								</IconDisplay>
							</ToastHeader>

							<ToastBody>
								<span>
									{hidden === undefined ? description : description.replace(LABEL_UNKNOWN, hidden)}
								</span>
							</ToastBody>
						</Toast>
					),
				)}
			</ToastContainer>
		)
	}
}
