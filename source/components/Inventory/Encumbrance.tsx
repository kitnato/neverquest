import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE_POINTS } from "@neverquest/data/general"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react"
import { encumbrance, encumbranceMaximum } from "@neverquest/state/inventory"
import { formatNumber } from "@neverquest/utilities/formatters"

export function Encumbrance() {
	const encumbranceValue = useRecoilValue(encumbrance)
	const encumbranceMaximumValue = useRecoilValue(encumbranceMaximum)

	useDeltaText({
		delta: "encumbranceMaximum",
		state: encumbranceMaximum,
	})

	return (
		<IconDisplay className="w-100" Icon={IconEncumbrance} tooltip="Encumbrance">
			<LabelledProgressBar value={(encumbranceValue / encumbranceMaximumValue) * PERCENTAGE_POINTS}>
				<Stack direction="horizontal" gap={1}>
					<span>
						{formatNumber({ value: encumbranceValue })}
						{" / "}
						{formatNumber({
							value: encumbranceMaximumValue,
						})}
					</span>

					<DeltasDisplay delta="encumbranceMaximum" />
				</Stack>
			</LabelledProgressBar>
		</IconDisplay>
	)
}
