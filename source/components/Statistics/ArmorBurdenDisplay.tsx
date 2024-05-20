import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LABEL_SEPARATOR } from "@neverquest/data/general"
import { STALWART_BURDEN_REDUCTION } from "@neverquest/data/traits"
import IconArmor from "@neverquest/icons/armor.svg?react"
import IconStalwart from "@neverquest/icons/stalwart.svg?react"
import IconStamina from "@neverquest/icons/stamina.svg?react"
import { armor, armorBurden } from "@neverquest/state/gear"
import { isTraitAcquired } from "@neverquest/state/traits"
import { formatNumber } from "@neverquest/utilities/formatters"

export function ArmorBurdenDisplay() {
	const armorValue = useRecoilValue(armor)
	const armorBurdenValue = useRecoilValue(armorBurden)
	const isTraitAcquiredStalwart = useRecoilValue(isTraitAcquired("stalwart"))

	const { burden } = armorValue

	return (
		<Stack gap={1}>
			{isTraitAcquiredStalwart && (
				<Stack direction="horizontal" gap={1}>
					<IconDisplay Icon={IconArmor} iconProps={{ className: "small" }}>
						<span>
							{formatNumber({ value: burden })}
						</span>
					</IconDisplay>

					{LABEL_SEPARATOR}

					<IconDisplay Icon={IconStalwart} iconProps={{ className: "small" }}>
						<span>
							{formatNumber({
								decimals: 0,
								format: "percentage",
								value: -STALWART_BURDEN_REDUCTION,
							})}
						</span>
					</IconDisplay>
				</Stack>
			)}

			<IconDisplay Icon={IconStamina} iconProps={{ className: "small" }}>
				<span>
					{formatNumber({ value: -armorBurdenValue })}
				</span>
			</IconDisplay>
		</Stack>
	)
}
