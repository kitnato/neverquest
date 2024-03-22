import type { Dispatch, SetStateAction } from "react"
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	Stack,
} from "react-bootstrap"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { ItemsInherited } from "@neverquest/components/Retirement/ItemsInherited"
import { Perks } from "@neverquest/components/Retirement/Perks"
import { RenewalDetails } from "@neverquest/components/Retirement/RenewalDetails"
import { TraitSelection } from "@neverquest/components/Retirement/TraitSelection"
import { useRetire } from "@neverquest/hooks/actions/useRetire"
import IconRetire from "@neverquest/icons/retire.svg?react"

export function Retirement({
	state: [isShowing, setIsShowing],
}: {
	state: [boolean, Dispatch<SetStateAction<boolean>>]
}) {
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

					<RenewalDetails />

					<Perks />

					<ItemsInherited />

					<TraitSelection />
				</Stack>
			</ModalBody>

			<ModalFooter>
				<Button
					onClick={() => {
						onHide()
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
