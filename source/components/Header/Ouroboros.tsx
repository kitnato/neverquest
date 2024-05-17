import { useState } from "react"

import { IconImage } from "@neverquest/components/IconImage"
import IconOuroboros from "@neverquest/icons/ouroboros.svg?react"

export function Ouroboros() {
	const [isAttuned, setIsAttuned] = useState(false)

	const attune = () => {
		setIsAttuned(current => !current)
	}

	return (
		<div
			onClick={attune}
			onKeyDown={attune}
			role="menuitem"
			tabIndex={0}
		>
			<IconImage
				className={`text-light${isAttuned ? " glowing" : ""}`}
				Icon={IconOuroboros}
			/>
		</div>
	)
}
