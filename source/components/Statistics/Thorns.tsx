import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { DetailsTable } from "@neverquest/components/DetailsTable"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { ElementalDetails } from "@neverquest/components/Statistics/ElementalDetails"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconThorns from "@neverquest/icons/thorns.svg?react"
import { thorns } from "@neverquest/state/statistics"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Thorns() {
	const thornsValue = useRecoilValue(thorns)

	useDeltaText({
		delta: "thorns",
		state: thorns,
	})

	if (thornsValue > 0) {
		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={IconThorns}
				tooltip="Thorns"
			>
				<Stack direction="horizontal" gap={1}>
					<OverlayTrigger
						overlay={(
							<Popover>
								<PopoverBody>
									<DetailsTable>
										<ElementalDetails slot="armor" />
									</DetailsTable>
								</PopoverBody>
							</Popover>
						)}
					>
						<span>{thornsValue}</span>
					</OverlayTrigger>

					<DeltasDisplay delta="thorns" />
				</Stack>
			</IconDisplay>
		)
	}
}
