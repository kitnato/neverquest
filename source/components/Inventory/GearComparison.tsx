import { useRecoilValue } from "recoil"

import { IconImage } from "@neverquest/components/IconImage"
import IconEquals from "@neverquest/icons/equals.svg?react"
import IconExtentLow from "@neverquest/icons/extent-low.svg?react"
import { isShowing } from "@neverquest/state/ui"

import type { Showing } from "@neverquest/types/unions"

export function GearComparison({
	difference,
	lowerIsPositive = false,
	showing,
}: {
	difference: number
	lowerIsPositive?: boolean
	showing: Showing
}) {
	const isShowingGearComparison = useRecoilValue(isShowing(showing))

	// NaN here is produced by subtracting Infinity from Infinity.
	const isDifferenceEqual = Number.isNaN(difference) || difference === 0
	const isPositive = lowerIsPositive ? difference < 0 : difference > 0

	if (isShowingGearComparison) {
		return (
			<IconImage
				className={
					`small ${isDifferenceEqual
						? "text-secondary"
						: isPositive
							? "text-success"
							: "text-danger"}`
				}
				Icon={isDifferenceEqual ? IconEquals : IconExtentLow}
				isFlipped={difference < 0}
			/>
		)
	}

	return null
}
