import { Stack } from "react-bootstrap"
import { useRecoilState } from "recoil"

import { ArmorOptions } from "@neverquest/components/Caravan/Blacksmith/ArmorOptions"
import { MeleeOptions } from "@neverquest/components/Caravan/Blacksmith/MeleeOptions"
import { ShieldOptions } from "@neverquest/components/Caravan/Blacksmith/ShieldOptions"
import { IconTabs } from "@neverquest/components/IconTabs"
import IconArmor from "@neverquest/icons/armor.svg?react"
import IconCraftWeapon from "@neverquest/icons/craft-weapon.svg?react"
import IconShield from "@neverquest/icons/shield.svg?react"
import { blacksmithOptions } from "@neverquest/state/caravan"

import type { Gear } from "@neverquest/types/unions"

export function Blacksmith() {
	const [{ activeTab }, setBlacksmithOptions] = useRecoilState(blacksmithOptions)

	return (
		<Stack gap={3}>
			<h6>Craft gear</h6>

			<IconTabs<Gear>
				activeKey={activeTab}
				onSelect={(key) => {
					setBlacksmithOptions(options => ({ ...options, activeTab: key as Gear }))
				}}
				tabs={[
					{
						Component: MeleeOptions,
						Icon: IconCraftWeapon,
						label: "weapon",
					},
					{
						Component: ArmorOptions,
						Icon: IconArmor,
						label: "armor",
					},
					{
						Component: ShieldOptions,
						Icon: IconShield,
						label: "shield",
					},
				]}
			/>
		</Stack>
	)
}
