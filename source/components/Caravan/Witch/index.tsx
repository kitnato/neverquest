import { Fragment } from "preact"
import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { PurchaseConsumable } from "@neverquest/components/Caravan/PurchaseConsumable"
import { TrainWitchSkill } from "@neverquest/components/Caravan/Witch/TrainWitchSkill"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { WITCH_POTIONS } from "@neverquest/data/caravan"
import { LABEL_UNKNOWN } from "@neverquest/data/general"
import IconUnknown from "@neverquest/icons/unknown.svg?react"
import { stageMaximum } from "@neverquest/state/character"

export function Witch() {
	const stageMaximumValue = useRecoilValue(stageMaximum)

	return (
		<Stack gap={5}>
			<Stack gap={3}>
				<h6>Purchase potions</h6>

				{WITCH_POTIONS.map(({ consumable, requiredStage }) => (
					<Fragment key={consumable}>
						{stageMaximumValue >= requiredStage
							? <PurchaseConsumable consumable={consumable} />

							: (
								<IconDisplay
									description={<span>Missing samples.</span>}
									Icon={IconUnknown}
									tooltip="Consumable"
								>
									<span>{LABEL_UNKNOWN}</span>
								</IconDisplay>
							)}
					</Fragment>
				))}
			</Stack>

			<TrainWitchSkill />
		</Stack>
	)
}
