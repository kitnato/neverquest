import { ListGroup, ListGroupItem, Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import IconAttributes from "@neverquest/icons/attributes.svg?react"
import IconGear from "@neverquest/icons/gear.svg?react"
import IconGeneration from "@neverquest/icons/generation.svg?react"
import IconMasteries from "@neverquest/icons/masteries.svg?react"
import IconMercenary from "@neverquest/icons/mercenary.svg?react"
import IconPowerLevel from "@neverquest/icons/power-level.svg?react"
import IconSkills from "@neverquest/icons/skills.svg?react"
import IconStage from "@neverquest/icons/stage.svg?react"
import IconTransmute from "@neverquest/icons/transmute.svg?react"
import { powerLevel } from "@neverquest/state/attributes"
import { generation, stage } from "@neverquest/state/character"
import { formatCardinal, formatNumber } from "@neverquest/utilities/formatters"

import { DescriptionDisplay } from "../DescriptionDisplay"

export function Renewal() {
	const generationValue = useRecoilValue(generation)
	const powerLevelValue = useRecoilValue(powerLevel)
	const stageValue = useRecoilValue(stage)

	return (
		<Stack gap={3}>
			<h6>Renewal</h6>

			<ListGroup>
				<ListGroupItem>
					<IconDisplay
						Icon={IconGeneration}
						iconProps={{ className: "small" }}
						tooltip="Generation"
					>
						<Stack direction="horizontal" gap={1}>
							<span>
								{formatCardinal(generationValue)}
							</span>

							<IconImage className="small text-secondary" Icon={IconTransmute} />

							<span>
								{formatCardinal(generationValue + 1)}
							</span>
						</Stack>
					</IconDisplay>
				</ListGroupItem>

				<ListGroupItem>
					<IconDisplay
						Icon={IconStage}
						iconProps={{ className: "small" }}
						tooltip="Stage"
					>
						<Stack direction="horizontal" gap={1}>
							<span>
								{formatNumber({ value: stageValue })}
							</span>

							<IconImage className="small text-secondary" Icon={IconTransmute} />

							<span>
								0
							</span>
						</Stack>
					</IconDisplay>
				</ListGroupItem>

				<ListGroupItem>
					<IconDisplay
						Icon={IconPowerLevel}
						iconProps={{ className: "small" }}
						tooltip="Power level"
					>
						<Stack direction="horizontal" gap={1}>
							<span>
								{formatNumber({ value: powerLevelValue })}
							</span>

							<IconImage className="small text-secondary" Icon={IconTransmute} />

							<span>
								0
							</span>
						</Stack>
					</IconDisplay>
				</ListGroupItem>

				<ListGroupItem>
					<IconDisplay Icon={IconAttributes} iconProps={{ className: "small" }}>
						<span>Attributes</span>
					</IconDisplay>
				</ListGroupItem>

				<ListGroupItem>
					<IconDisplay Icon={IconSkills} iconProps={{ className: "small" }}>
						<DescriptionDisplay
							description="Skills trained by the # Mercenary."
							descriptionIcons={[IconMercenary]}
						/>
					</IconDisplay>
				</ListGroupItem>

				<ListGroupItem>
					<IconDisplay Icon={IconMasteries} iconProps={{ className: "small" }}>
						<span>Masteries</span>
					</IconDisplay>
				</ListGroupItem>

				<ListGroupItem>
					<IconDisplay Icon={IconGear} iconProps={{ className: "small" }}>
						<span>Gear</span>
					</IconDisplay>
				</ListGroupItem>
			</ListGroup>
		</Stack>
	)
}
