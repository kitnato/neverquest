import { FormControl } from "react-bootstrap"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import IconGearLevel from "@neverquest/icons/gear-level.svg?react"
import { formatNumber } from "@neverquest/utilities/formatters"

export function SetGearLevel({
	isDisabled,
	level,
	maximum,
	setLevel,
}: {
	isDisabled: boolean
	level: number
	maximum: number
	setLevel: (level: number) => void
}) {
	return (
		<IconDisplay
			Icon={IconGearLevel}
			iconProps={{ overlayPlacement: "left" }}
			tooltip="Gear level"
		>
			<FormControl
				disabled={isDisabled}
				max={maximum}
				min={1}
				onChange={({ currentTarget: { value } }) => {
					if (!value) {
						return
					}

					const parsedValue = Number.parseInt(value)

					if (Number.isNaN(parsedValue) || parsedValue < 1 || parsedValue > maximum) {
						return
					}

					setLevel(parsedValue)
				}}
				style={{ width: 80 }}
				type="number"
				value={formatNumber({ value: level })}
			/>
		</IconDisplay>
	)
}
