import { useEffect } from "react"
import { Card, CardBody } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { Monster } from "@neverquest/components/Monster"
import { LABEL_UNKNOWN } from "@neverquest/data/general"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import IconBossHiding from "@neverquest/icons/boss-hiding.svg?react"
import IconFinality from "@neverquest/icons/finality.svg?react"
import IconMonsterHiding from "@neverquest/icons/monster-hiding.svg?react"
import IconRemains from "@neverquest/icons/remains.svg?react"
import IconVoid from "@neverquest/icons/void.svg?react"
import { encounter, isStageCompleted, isStageStarted } from "@neverquest/state/character"
import { isFinality } from "@neverquest/types/type-guards"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Wilderness() {
	const encounterValue = useRecoilValue(encounter)
	const isStageStartedValue = useRecoilValue(isStageStarted)
	const isStageCompletedValue = useRecoilValue(isStageCompleted)

	const progressQuest = useProgressQuest()

	const isVoid = encounterValue === "void"

	useEffect(() => {
		if (isVoid) {
			progressQuest({ quest: "visitingVoid" })
		}
	}, [isVoid, progressQuest])

	if (isVoid) {
		return (
			<Card className={getAnimationClass({ animation: "flipInX" })}>
				<CardBody>
					<IconDisplay gap={5} Icon={IconVoid} tooltip="Void">
						<span className="fst-italic">A shattering emptiness lingers ...</span>
					</IconDisplay>
				</CardBody>
			</Card>
		)
	}

	if (isStageCompletedValue) {
		return (
			<Card className={getAnimationClass({ animation: "flipInX" })}>
				<CardBody>
					<IconDisplay gap={5} Icon={IconRemains} tooltip="Remains">
						<span className="fst-italic">{isFinality(encounterValue) ? "A great finality has fallen." : "Everything is dead."}</span>
					</IconDisplay>
				</CardBody>
			</Card>
		)
	}

	if (isStageStartedValue) {
		return <Monster />
	}

	return (
		<Card className={getAnimationClass({ animation: "zoomIn", speed: "fast" })}>
			<CardBody>
				<IconDisplay
					gap={5}
					Icon={
						encounterValue === "boss"
							? IconBossHiding
							: encounterValue === "monster"
								? IconMonsterHiding
								: IconFinality
					}
					tooltip={LABEL_UNKNOWN}
				>
					<span className="fst-italic">
						{encounterValue === "boss"
							? "A powerful presence looms."
							: encounterValue === "monster"
								? "The darkness stirs."
								: "A grim entity is manifesting."}
					</span>
				</IconDisplay>
			</CardBody>
		</Card>
	)
}
