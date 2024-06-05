import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { GearComparison } from "@neverquest/components/Inventory/GearComparison"
import IconGearLevel from "@neverquest/icons/gear-level.svg?react"
import { isShowing } from "@neverquest/state/ui"
import { formatNumber } from "@neverquest/utilities/formatters"

import type { Comparison } from "@neverquest/types/components"

export function GearLevelDetail({ comparison, level }: { comparison: Comparison, level: number }) {
	const isShowingGearLevel = useRecoilValue(isShowing("gearLevel"))

	if (isShowingGearLevel && level > 0) {
		return (
			<tr>
				<td>
					<span>Gear level:</span>
				</td>

				<td>
					<Stack direction="horizontal" gap={1}>
						<IconDisplay Icon={IconGearLevel} iconProps={{ className: "small" }}>
							<span>{formatNumber({ value: level })}</span>
						</IconDisplay>

						{comparison !== false && (
							<GearComparison
								difference={level - comparison.subtrahend}
								showing={comparison.showing}
							/>
						)}
					</Stack>
				</td>
			</tr>
		)
	}

	return null
}
