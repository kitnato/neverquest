import { useState } from "react"
import {
	Button,
	Modal,
	ModalBody,
	ModalHeader,
	ModalTitle,
	OverlayTrigger,
	Stack,
	Tooltip,
} from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { Infuse } from "@neverquest/components/Inventory/Inheritable/Infusion/Infuse"
import { InfusionEffect } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionEffect"
import { InfusionLevel } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionLevel"
import { InfusionProgress } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionProgress"
import { LABEL_SKILL_REQUIRED, POPOVER_TRIGGER } from "@neverquest/data/general"
import { INFUSABLES } from "@neverquest/data/items"
import { isSkillAcquired } from "@neverquest/state/skills"

import type { Infusable } from "@neverquest/types/unions"

export function Infusion({ infusable }: { infusable: Infusable }) {
	const isSkillAcquiredMeditation = useRecoilValue(isSkillAcquired("meditation"))

	const [isShowingInfusion, setIsShowingInfusion] = useState(false)

	const { Icon } = INFUSABLES[infusable]

	return (
		<>
			<OverlayTrigger
				overlay={(
					<Tooltip>
						<span>{LABEL_SKILL_REQUIRED}</span>
					</Tooltip>
				)}
				trigger={isSkillAcquiredMeditation ? [] : POPOVER_TRIGGER}
			>
				<div>
					<Button
						disabled={!isSkillAcquiredMeditation}
						onClick={() => {
							setIsShowingInfusion(true)
						}}
						variant="outline-dark"
					>
						<span>Appraise</span>
					</Button>
				</div>
			</OverlayTrigger>

			<Modal
				centered
				onHide={() => {
					setIsShowingInfusion(false)
				}}
				show={isShowingInfusion}
			>
				<ModalHeader closeButton>
					<ModalTitle>
						<IconDisplay Icon={Icon}>
							<span>Infusion</span>
						</IconDisplay>
					</ModalTitle>
				</ModalHeader>

				<ModalBody>
					<Stack gap={3}>
						<InfusionEffect infusable={infusable} />

						<Stack direction="horizontal" gap={3}>
							<InfusionLevel infusable={infusable} />

							<InfusionProgress infusable={infusable} />

							<Infuse infusable={infusable} />
						</Stack>
					</Stack>
				</ModalBody>
			</Modal>
		</>
	)
}
