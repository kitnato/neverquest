import { useRecoilValue } from "recoil"

import { QuestDisplay } from "@neverquest/components/Quests/QuestDisplay"
import { activeQuests } from "@neverquest/state/quests"

import type { Quest } from "@neverquest/types/unions"

export function QuestListing({ quest }: { quest: Quest }) {
	const activeQuestsValue = useRecoilValue(activeQuests(quest))

	return activeQuestsValue.map(activeQuest =>
		<QuestDisplay activeQuest={activeQuest} key={activeQuest.title} quest={quest} />,
	)
}
