import { generateLocation } from "@kitnato/locran"
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	Stack,
} from "react-bootstrap"
import { useRecoilValue, useSetRecoilState } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import { DEATH_STAGE_PENALTY } from "@neverquest/data/encounter"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useResetCharacter } from "@neverquest/hooks/actions/useResetCharacter"
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness"
import IconCapabilities from "@neverquest/icons/capabilities.svg?react"
import IconCorpse from "@neverquest/icons/corpse.svg?react"
import IconEssence from "@neverquest/icons/essence.svg?react"
import IconFlatlined from "@neverquest/icons/flatlined.svg?react"
import IconKnapsack from "@neverquest/icons/knapsack.svg?react"
import { hasFlatlined } from "@neverquest/state/character"
import { stage, stageMaximum, wildernesses } from "@neverquest/state/encounter"
import { getAffixStructure } from "@neverquest/utilities/getters"

export function Flatline() {
	const hasFlatlinedValue = useRecoilValue(hasFlatlined)
	const stageMaximumValue = useRecoilValue(stageMaximum)
	const setStage = useSetRecoilState(stage)
	const setWildernesses = useSetRecoilState(wildernesses)

	const progressQuest = useProgressQuest()
	const resetCharacter = useResetCharacter()
	const resetWilderness = useResetWilderness()

	return (
		<Modal backdrop="static" show={hasFlatlinedValue}>
			<ModalHeader>
				<ModalTitle>
					<IconDisplay Icon={IconFlatlined}>
						<span>Flatline</span>
					</IconDisplay>
				</ModalTitle>
			</ModalHeader>

			<ModalBody>
				<Stack gap={1}>
					<Stack direction="horizontal" gap={1}>
						<span>Unspent</span>

						<IconImage className="small" Icon={IconEssence} />

						<span>essence is lost.</span>
					</Stack>

					<Stack direction="horizontal" gap={1}>
						<IconImage className="small" Icon={IconCapabilities} />

						<span>Memories and</span>

						<IconImage className="small" Icon={IconKnapsack} />

						<span>possessions are retained.</span>
					</Stack>

					<Stack direction="horizontal" gap={1}>
						<span>A</span>

						<IconImage className="small" Icon={IconCorpse} />

						<span>corpse decorates the battlefield, ripe for scavenging.</span>
					</Stack>

					<span>The wilderness is shifting ...</span>
				</Stack>
			</ModalBody>

			<ModalFooter>
				<Button
					onClick={() => {
						if (stageMaximumValue > DEATH_STAGE_PENALTY) {
							setWildernesses(currentWildernesses => currentWildernesses.slice(0, -1))
							setStage(currentStage => currentStage - 1)
						}
						else {
							setWildernesses([generateLocation({ affixStructure: getAffixStructure() })])
						}

						progressQuest({ amount: -1, quest: "stages" })
						progressQuest({ amount: -1, quest: "stagesEnd" })

						resetCharacter(true)
						resetWilderness()
					}}
					variant="outline-dark"
				>
					<span>Rebirth</span>
				</Button>
			</ModalFooter>
		</Modal>
	)
}
