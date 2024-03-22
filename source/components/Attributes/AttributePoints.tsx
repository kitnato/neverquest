import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconAttributePoints from "@neverquest/icons/attribute-points.svg?react"
import IconEssence from "@neverquest/icons/essence.svg?react"
import { attributePoints, powerLevel } from "@neverquest/state/attributes"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAttributePointCost } from "@neverquest/utilities/getters"

export function AttributePoints() {
	const attributePointsValue = useRecoilValue(attributePoints)
	const powerLevelValue = useRecoilValue(powerLevel)

	useDeltaText({
		delta: "attributePoints",
		state: attributePoints,
	})

	return (
		<IconDisplay Icon={IconAttributePoints} tooltip="Available attribute points">
			<Stack direction="horizontal">
				<OverlayTrigger
					overlay={(
						<Popover>
							<PopoverHeader className="text-center">
								<span>Attribute point cost</span>
							</PopoverHeader>

							<PopoverBody>
								<IconDisplay
									className="justify-content-center"
									Icon={IconEssence}
									iconProps={{ className: "small" }}
								>
									<span>{formatNumber({ value: getAttributePointCost(powerLevelValue) })}</span>
								</IconDisplay>
							</PopoverBody>
						</Popover>
					)}
					placement="left"
				>
					<span>{attributePointsValue}</span>
				</OverlayTrigger>

				<DeltasDisplay delta="attributePoints" />
			</Stack>
		</IconDisplay>
	)
}
