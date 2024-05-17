import { useState } from "react"
import {
	Button,
	Modal,
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
	OverlayTrigger,
	Tooltip,
} from "react-bootstrap"
import { useSetRecoilState } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import { useNeutralize } from "@neverquest/hooks/actions/useNeutralize"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import IconDiscard from "@neverquest/icons/discard.svg?react"
import { inventory } from "@neverquest/state/inventory"
import { capitalizeAll } from "@neverquest/utilities/formatters"
import { getItemIcon } from "@neverquest/utilities/getters"

import type { InventoryItem } from "@neverquest/types"

export function DiscardItem({ item }: { item: InventoryItem }) {
	const setInventory = useSetRecoilState(inventory)

	const [isShowingModal, setIsShowingModal] = useState(false)

	const { ID, name } = item

	const neutralize = useNeutralize()
	const progressQuest = useProgressQuest()

	const onHide = () => {
		setIsShowingModal(false)
	}

	return (
		<>
			<OverlayTrigger
				overlay={(
					<Tooltip>
						<span>Discard</span>
					</Tooltip>
				)}
			>
				<Button
					onClick={() => {
						setIsShowingModal(true)
					}}
					variant="outline-dark"
				>
					<IconImage className="small" Icon={IconDiscard} />
				</Button>
			</OverlayTrigger>

			<Modal onHide={onHide} show={isShowingModal}>
				<ModalHeader closeButton>
					<ModalTitle>
						<IconDisplay Icon={IconDiscard}>
							<span>Discard item?</span>
						</IconDisplay>
					</ModalTitle>
				</ModalHeader>

				<ModalBody>
					<IconDisplay Icon={getItemIcon(item)} iconProps={{ className: "small" }}>
						<span>{`${capitalizeAll(name)} will be lost forever.`}</span>
					</IconDisplay>
				</ModalBody>

				<ModalFooter>
					<Button
						onClick={() => {
							setInventory(currentInventory =>
								currentInventory.filter(({ ID: currentItemID }) => currentItemID !== ID),
							)

							neutralize({ item })
							progressQuest({ quest: "discarding" })

							onHide()
						}}
						variant="outline-dark"
					>
						<span>Discard</span>
					</Button>
				</ModalFooter>
			</Modal>
		</>
	)
}
