import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { FormControl } from "react-bootstrap"
import { useRecoilState, useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LABEL_UNKNOWN, LEVELLING_MAXIMUM, NAME_LENGTH_MAXIMUM } from "@neverquest/data/general"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import IconFlatlined from "@neverquest/icons/flatlined.svg?react"
import IconName from "@neverquest/icons/name.svg?react"
import { hasFlatlined, name } from "@neverquest/state/character"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Name() {
	const hasFlatlinedValue = useRecoilValue(hasFlatlined)
	const [nameValue, setName] = useRecoilState(name)

	const [canEdit, setCanEdit] = useState(true)
	const [isEditing, setIsEditing] = useState(false)

	const element = useRef<HTMLInputElement | null>(null)

	const progressQuest = useProgressQuest()

	useEffect(() => {
		const { current } = element

		if (current !== null && isEditing) {
			if (nameValue === LABEL_UNKNOWN) {
				current.select()
			}
			else {
				current.focus()
			}
		}
	}, [isEditing, nameValue])

	useLayoutEffect(() => {
		new MutationObserver(() => {
			const isModalOpen = document.body.classList.contains("modal-open")

			setCanEdit(!isModalOpen)
			setIsEditing(false)
		}).observe(document.body, { attributeFilter: ["class"] })
	}, [])

	return (
		<IconDisplay
			className={getAnimationClass({ animation: "flipInX" })}
			Icon={hasFlatlinedValue ? IconFlatlined : IconName}
			tooltip="Name"
		>
			<FormControl
				className={canEdit && !isEditing ? "hover-grow" : undefined}
				onBlur={({ currentTarget: { value } }) => {
					const selected = window.getSelection()
					const trimmedValue = value.trim().replaceAll(/\s+/g, " ")

					setIsEditing(false)

					if (selected !== null) {
						selected.removeAllRanges()
					}

					if (trimmedValue === LABEL_UNKNOWN) {
						return
					}

					if (trimmedValue === "") {
						setName(LABEL_UNKNOWN)
					}
					else {
						setName(trimmedValue)
						progressQuest({ quest: "settingName" })

						if (trimmedValue.toLowerCase().replaceAll(/[^\da-z]/g, "") === `subject${LEVELLING_MAXIMUM}`) {
							progressQuest({ quest: "settingSubjectName" })
						}
					}
				}}
				onChange={({ target: { value } }) => {
					if (value.length >= NAME_LENGTH_MAXIMUM) {
						return
					}

					setName(value)
				}}
				onClick={() => {
					if (canEdit) {
						setIsEditing(true)
					}
				}}
				onKeyDown={({ key }) => {
					if (key === "Enter") {
						setIsEditing(false)
					}
				}}
				plaintext={!isEditing}
				readOnly={!isEditing}
				ref={element}
				value={nameValue}
			/>
		</IconDisplay>
	)
}
