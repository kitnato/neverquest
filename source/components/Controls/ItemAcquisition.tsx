import { useEffect } from "react"
import { useRecoilState, useResetRecoilState } from "recoil"

import { IconImage } from "@neverquest/components/IconImage"
import { acquiredItems } from "@neverquest/state/inventory"
import { getAnimationClass, getItemIcon } from "@neverquest/utilities/getters"

export function ItemAcquisition() {
	const [acquiredItemsValue, setAcquiredItems] = useRecoilState(acquiredItems)
	const resetAcquiredItems = useResetRecoilState(acquiredItems)

	useEffect(resetAcquiredItems, [resetAcquiredItems])

	return (
		<div className="position-absolute top-50 start-0">
			{acquiredItemsValue.map((acquiredItem) => {
				const { ID } = acquiredItem

				return (
					<div
						className={`position-absolute ${getAnimationClass({
							animation: "zoomOut",
							speed: "slower",
						})}`}
						key={ID}
						onAnimationEnd={() => {
							setAcquiredItems(currentAcquiredItems =>
								currentAcquiredItems.filter(({ ID: acquiredItemID }) => acquiredItemID !== ID),
							)
						}}
					>
						<IconImage className="small translate-middle" Icon={getItemIcon(acquiredItem)} />
					</div>
				)
			})}
		</div>
	)
}
