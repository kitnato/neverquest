import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import IconCaravan from "@neverquest/icons/caravan.svg?react"
import IconWilderness from "@neverquest/icons/wilderness.svg?react"
import { location, locationName } from "@neverquest/state/encounter"
import { isShowing } from "@neverquest/state/ui"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Location() {
	const isShowingLocation = useRecoilValue(isShowing("location"))
	const locationValue = useRecoilValue(location)
	const locationNameValue = useRecoilValue(locationName)

	return (
		<div className={isShowingLocation ? getAnimationClass({ animation: "flipInX" }) : "invisible"}>
			<IconDisplay
				Icon={locationValue === "caravan" ? IconCaravan : IconWilderness}
				iconProps={{ overlayPlacement: "bottom" }}
				tooltip="Location"
			>
				<span>{locationNameValue}</span>
			</IconDisplay>
		</div>
	)
}
