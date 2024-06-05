import { useEffect } from "preact/hooks"
import { ProgressBar, Stack } from "react-bootstrap"
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { LABEL_SEPARATOR, LABEL_TOTAL, PERCENTAGE } from "@neverquest/data/general"
import { RESERVES } from "@neverquest/data/reserves"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import { usePreviousValue } from "@neverquest/hooks/usePreviousValue"
import IconBlighted from "@neverquest/icons/blighted.svg?react"
import IconPoisoned from "@neverquest/icons/poisoned.svg?react"
import {
	blightMagnitude,
	healthMaximumPoisoned,
	isBlighted,
	isIncapacitated,
	isPoisoned,
	isRegenerating,
	poisonDuration,
	regenerationDuration,
	regenerationRate,
	reserveCurrent,
	reserveMaximum,
	staminaMaximumBlighted,
} from "@neverquest/state/reserves"
import { formatNumber } from "@neverquest/utilities/formatters"

import type { Reserve } from "@neverquest/types/unions"

export function ReserveMeter({ reserve }: { reserve: Reserve }) {
	const isHealth = reserve === "health"
	const reserveMaximumState = reserveMaximum(reserve)
	const reserveState = reserveCurrent(reserve)

	const [reserveValue, setReserve] = useRecoilState(reserveState)
	const ailmentExtent = useRecoilValue(isHealth ? poisonDuration : blightMagnitude)
	const isIncapacitatedValue = useRecoilValue(isIncapacitated)
	const isAiling = useRecoilValue(isHealth ? isPoisoned : isBlighted)
	const isRegeneratingValue = useRecoilValue(isRegenerating(reserve))
	const regenerationRateValue = useRecoilValue(regenerationRate(reserve))
	const reserveMaximumValue = useRecoilValue(reserveMaximumState)
	const reserveMaximumAilingValue = useRecoilValue(
		isHealth ? healthMaximumPoisoned : staminaMaximumBlighted,
	)
	const resetReserve = useResetRecoilState(reserveState)
	const resetRegenerationDuration = useResetRecoilState(regenerationDuration(reserve))
	const setRegenerationDuration = useSetRecoilState(regenerationDuration(reserve))

	const { maximumDelta } = RESERVES[reserve]
	const penalty = Math.round(
		(reserveMaximumValue - reserveMaximumAilingValue) / reserveMaximumValue * PERCENTAGE,
	)

	useDeltaText({
		delta: maximumDelta,
		state: reserveMaximumState,
		suffix: LABEL_TOTAL.toUpperCase(),
	})

	// Have current health and stamina increase the same if the maximum is increased (e.g. via attribute).
	const previousReserveMaximumAiling = usePreviousValue(reserveMaximumAilingValue)
	const reserveMaximumDifference = previousReserveMaximumAiling === undefined ? 0 : reserveMaximumAilingValue - previousReserveMaximumAiling

	useEffect(() => {
		if (
			!isIncapacitatedValue
			&& !isAiling
			&& reserveMaximumDifference > 0
			&& reserveValue < reserveMaximumAilingValue
		) {
			setReserve(currentReserve => currentReserve + reserveMaximumDifference)
		}
	}, [
		isIncapacitatedValue,
		isAiling,
		reserveMaximumAilingValue,
		reserveMaximumDifference,
		reserveValue,
		setReserve,
	])

	// Catches attribute resets and poison/blight penalties.
	useEffect(() => {
		if (reserveValue > reserveMaximumAilingValue) {
			resetReserve()
			resetRegenerationDuration()
		}
	}, [
		reserveMaximumAilingValue,
		reserveValue,
		resetRegenerationDuration,
		resetReserve,
	])

	// Always trigger regeneration if lower than ailing maximum.
	useEffect(() => {
		if (!isRegeneratingValue && reserveValue < reserveMaximumAilingValue) {
			setRegenerationDuration(regenerationRateValue)
		}
	}, [
		isRegeneratingValue,
		regenerationRateValue,
		reserveMaximumAilingValue,
		reserveValue,
		setRegenerationDuration,
	])

	return (
		<LabelledProgressBar
			attachment="below"
			sibling={isAiling && <ProgressBar animated={isHealth} key={2} now={penalty} striped variant="secondary" />}
			value={reserveValue / reserveMaximumAilingValue * (PERCENTAGE - penalty)}
		>
			<Stack direction="horizontal" gap={1}>
				<span className="text-nowrap">
					{formatNumber({ value: reserveValue })}
					{" / "}
					{formatNumber({
						value: reserveMaximumAilingValue,
					})}
				</span>

				{isAiling && (
					<>
						{LABEL_SEPARATOR}

						<span>{formatNumber({ value: reserveMaximumValue })}</span>

						<IconDisplay
							Icon={isHealth ? IconPoisoned : IconBlighted}
							iconProps={{ className: "small stencilled" }}
						>
							<span>
								{isHealth
									? formatNumber({ format: "time", value: ailmentExtent })
									: formatNumber({
										format: "percentage",
										value: -ailmentExtent,
									})}
							</span>
						</IconDisplay>
					</>
				)}

				<Stack>
					<DeltasDisplay delta={isHealth ? "health" : "stamina"} />

					<DeltasDisplay delta={maximumDelta} />
				</Stack>
			</Stack>
		</LabelledProgressBar>
	)
}
