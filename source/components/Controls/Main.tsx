import {
	Badge,
	Button,
	OverlayTrigger,
	Popover,
	PopoverBody,
	PopoverHeader,
	Stack,
	Tooltip,
} from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconImage } from "@neverquest/components/IconImage"
import { useResurrection } from "@neverquest/hooks/actions/useResurrection"
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking"
import IconAttack from "@neverquest/icons/attack.svg?react"
import IconGrinding from "@neverquest/icons/grinding.svg?react"
import IconHealth from "@neverquest/icons/health.svg?react"
import IconPhylactery from "@neverquest/icons/phylactery.svg?react"
import IconResting from "@neverquest/icons/resting.svg?react"
import IconResurrection from "@neverquest/icons/resurrection.svg?react"
import IconRetreat from "@neverquest/icons/retreat.svg?react"
import { areAttributesAffordable } from "@neverquest/state/attributes"
import {
	canResurrect,
	hasEnoughMunitions,
	isAttacking,
	isIncapacitated,
} from "@neverquest/state/character"
import { isStageCompleted, location } from "@neverquest/state/encounter"
import { isRelicEquipped } from "@neverquest/state/items"
import { isMonsterDead } from "@neverquest/state/monster"
import { isHealthLow } from "@neverquest/state/reserves"
import { getAnimationClass } from "@neverquest/utilities/getters"

import type { SVGIcon } from "@neverquest/types/components"

export function Main() {
	const areAttributesAffordableValue = useRecoilValue(areAttributesAffordable)
	const canResurrectValue = useRecoilValue(canResurrect)
	const hasEnoughMunitionsValue = useRecoilValue(hasEnoughMunitions)
	const isAttackingValue = useRecoilValue(isAttacking)
	const isHealthLowValue = useRecoilValue(isHealthLow)
	const isIncapacitatedValue = useRecoilValue(isIncapacitated)
	const isMonsterDeadValue = useRecoilValue(isMonsterDead)
	const isAutomincerEquipped = useRecoilValue(isRelicEquipped("automincer"))
	const isStageCompletedValue = useRecoilValue(isStageCompleted)
	const locationValue = useRecoilValue(location)

	const toggleAttacking = useToggleAttacking()
	const resurrection = useResurrection()

	const isResting = isStageCompletedValue || locationValue === "caravan"
	const pulseAnimation = getAnimationClass({
		animation: "pulse",
		isInfinite: true,
	})
	const showWarning = isAttackingValue && isHealthLowValue && !isMonsterDeadValue && !isResting

	const { animation, Icon, tooltip }: { animation?: string, Icon: SVGIcon, tooltip: string } = (() => {
		if (canResurrectValue) {
			return { animation: pulseAnimation, Icon: IconResurrection, tooltip: "Resurrection" }
		}

		if (isResting) {
			return { Icon: IconResting, tooltip: "Resting" }
		}

		if (isAttackingValue) {
			return {
				animation: showWarning ? pulseAnimation : undefined,
				Icon: IconRetreat,
				tooltip: "Retreat",
			}
		}

		return {
			animation: areAttributesAffordableValue || !hasEnoughMunitionsValue || isHealthLowValue || isMonsterDeadValue
				? undefined
				: pulseAnimation,
			Icon: IconAttack,
			tooltip: "Attack",
		}
	})()

	return (
		<OverlayTrigger
			overlay={(
				<Popover>
					<PopoverHeader className="text-center">
						<Stack direction="horizontal" gap={1}>
							<span>Low</span>

							<IconImage className="small" Icon={IconHealth} />

							<span>health</span>
						</Stack>
					</PopoverHeader>

					<PopoverBody>
						<span>&quot;The meaning of life is that it ends.&quot;</span>
					</PopoverBody>
				</Popover>
			)}
			show={showWarning}
		>
			<div className={getAnimationClass({ animation: "bounceIn" })}>
				<OverlayTrigger
					overlay={(
						<Tooltip>
							<span>{tooltip}</span>
						</Tooltip>
					)}
					placement={showWarning ? "bottom" : undefined}
				>
					<div>
						<Button
							className={animation}
							disabled={isIncapacitatedValue || isResting}
							onClick={canResurrectValue ? resurrection : toggleAttacking}
							variant="outline-dark"
						>
							<IconImage Icon={Icon} />

							{(canResurrectValue || (isAutomincerEquipped && !isResting)) && (
								<Badge
									bg="secondary"
									className="position-absolute start-100 top-50 translate-middle"
								>
									<IconImage
										className="small"
										Icon={canResurrectValue ? IconPhylactery : IconGrinding}
									/>
								</Badge>
							)}
						</Button>
					</div>
				</OverlayTrigger>
			</div>
		</OverlayTrigger>
	)
}
