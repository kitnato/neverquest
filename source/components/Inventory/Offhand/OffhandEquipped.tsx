import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { Munitions } from "@neverquest/components/Inventory/Offhand/Munitions"
import { ShieldName } from "@neverquest/components/Inventory/Offhand/ShieldName"
import IconTwoHanded from "@neverquest/icons/two-handed.svg?react"
import { shield, weapon } from "@neverquest/state/gear"
import { isTraitEarned } from "@neverquest/state/traits"
import { isShowing } from "@neverquest/state/ui"
import { isRanged } from "@neverquest/types/type-guards"
import { getAnimationClass, getGearIcon } from "@neverquest/utilities/getters"

export function OffhandEquipped() {
	const isShowingOffhand = useRecoilValue(isShowing("offhand"))
	const isTraitEarnedColossus = useRecoilValue(isTraitEarned("colossus"))
	const shieldValue = useRecoilValue(shield)
	const weaponValue = useRecoilValue(weapon)

	if (isShowingOffhand) {
		if (isRanged(weaponValue)) {
			return <Munitions />
		}

		if (!isTraitEarnedColossus && weaponValue.grip === "two-handed") {
			return (
				<IconDisplay className={`${getAnimationClass({ animation: "flipInX" })} opacity-50`} Icon={IconTwoHanded}>
					<span>{weaponValue.name}</span>
				</IconDisplay>
			)
		}

		return (
			<IconDisplay
				className={getAnimationClass({ animation: "flipInX" })}
				Icon={getGearIcon(shieldValue)}
				tooltip="Equipped shield"
			>
				<ShieldName overlayPlacement="top" shield={shieldValue} />
			</IconDisplay>
		)
	}
}
