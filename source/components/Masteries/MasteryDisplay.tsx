import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DescriptionDisplay } from "@neverquest/components/DescriptionDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { MasteryProgress } from "@neverquest/components/Masteries/MasteryProgress"
import { MasteryRank } from "@neverquest/components/Masteries/MasteryRank"
import { LABEL_SKILL_REQUIRED, LABEL_UNKNOWN } from "@neverquest/data/general"
import { MASTERIES } from "@neverquest/data/masteries"
import IconUnknown from "@neverquest/icons/unknown.svg?react"
import { canIncreaseMastery } from "@neverquest/state/masteries"
import { isSkillTrained } from "@neverquest/state/skills"
import { capitalizeAll } from "@neverquest/utilities/formatters"
import { getAnimationClass } from "@neverquest/utilities/getters"

import type { Mastery } from "@neverquest/types/unions"

export function MasteryDisplay({ mastery }: { mastery: Mastery }) {
	const canIncreaseMasteryValue = useRecoilValue(canIncreaseMastery(mastery))
	const isSkillTrainedRequired = useRecoilValue(isSkillTrained(MASTERIES[mastery].requiredSkill))

	const { description, descriptionIcons, Icon } = MASTERIES[mastery]

	return (
		<div className={getAnimationClass({ animation: "flipInX" })}>
			{isSkillTrainedRequired
				? (
					<IconDisplay
						className={canIncreaseMasteryValue ? "" : "opacity-50"}
						description={(
							<Stack className="w-100" direction="horizontal" gap={3}>
								<MasteryRank mastery={mastery} />

								<MasteryProgress mastery={mastery} />
							</Stack>
						)}
						Icon={Icon}
						tooltip="Mastery"
					>
						<OverlayTrigger
							overlay={(
								<Popover>
									<PopoverBody>
										<DescriptionDisplay
											description={description}
											descriptionIcons={descriptionIcons}
										/>
									</PopoverBody>
								</Popover>
							)}
							placement="right"
						>
							<span className="fitted">{capitalizeAll(mastery)}</span>
						</OverlayTrigger>
					</IconDisplay>
				)
				: (
					<IconDisplay
						description={<span>{LABEL_SKILL_REQUIRED}</span>}
						Icon={IconUnknown}
						tooltip="Mastery"
					>
						<span>{LABEL_UNKNOWN}</span>
					</IconDisplay>
				)}
		</div>
	)
}
