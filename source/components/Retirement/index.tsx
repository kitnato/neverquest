import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	Stack,
} from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { ItemsInherited } from "@neverquest/components/Retirement/ItemsInherited"
import { Perks } from "@neverquest/components/Retirement/Perks"
import { Renewal } from "@neverquest/components/Retirement/Renewal"
import { TraitSelection } from "@neverquest/components/Retirement/TraitSelection"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useRetire } from "@neverquest/hooks/actions/useRetire"
import IconRetire from "@neverquest/icons/retire.svg?react"
import { ownedItem } from "@neverquest/state/inventory"
import { isSkillTrained } from "@neverquest/state/skills"

import type { SetStateAction } from "preact/compat"
import type { Dispatch } from "preact/hooks"

export function Retirement({
	state: [isShowing, setIsShowing],
}: {
	state: [boolean, Dispatch<SetStateAction<boolean>>]
}) {
	const isSkillTrainedMemetics = useRecoilValue(isSkillTrained("memetics"))
	const ownedItemJournal = useRecoilValue(ownedItem("journal"))

	const progressQuest = useProgressQuest()
	const retire = useRetire()

	const onHide = () => {
		setIsShowing(false)
	}

	return (
		<Modal onHide={onHide} show={isShowing} size="lg">
			<ModalHeader closeButton>
				<ModalTitle>
					<IconDisplay Icon={IconRetire}>
						<span>Retirement</span>
					</IconDisplay>
				</ModalTitle>
			</ModalHeader>

			<ModalBody>
				<Stack gap={5}>
					<span className="fst-italic">
						Weary bones yearn for quiescence to foster a new beginning.
					</span>

					<Renewal />

					<Perks />

					<ItemsInherited />

					<TraitSelection />
				</Stack>
			</ModalBody>

			<ModalFooter>
				<Button
					onClick={() => {
						onHide()

						if (ownedItemJournal !== undefined && isSkillTrainedMemetics) {
							progressQuest({ quest: "deciphering" })
						}

						retire()
					}}
					variant="outline-dark"
				>
					<span>Retire</span>
				</Button>
			</ModalFooter>
		</Modal>
	)
}
