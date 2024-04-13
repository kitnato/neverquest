import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import IconGenerations from "@neverquest/icons/generations.svg?react"
import IconTransmute from "@neverquest/icons/transmute.svg?react"
import { generations } from "@neverquest/state/encounter"
import { formatNumber } from "@neverquest/utilities/formatters"

export function Generations() {
	const generationsValue = useRecoilValue(generations)

	return (
		<Stack gap={3}>
			<IconDisplay Icon={IconGenerations} tooltip="Generation">
				<Stack direction="horizontal" gap={3}>
					<span>
						{formatNumber({ value: generationsValue })}
					</span>

					<IconImage className="small text-secondary" Icon={IconTransmute} />

					<span>
						{formatNumber({ value: generationsValue + 1 })}
					</span>
				</Stack>
			</IconDisplay>
		</Stack>
	)
}
