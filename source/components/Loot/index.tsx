import { Stack } from "react-bootstrap"
import { useRecoilValue, useSetRecoilState } from "recoil"

import { LootDisplay } from "@neverquest/components/Loot/LootDisplay"
import { Looting } from "@neverquest/components/Loot/Looting"
import { useAutoIncreaseStage } from "@neverquest/hooks/actions/useAutoIncreaseStage"
import { useDropLoot } from "@neverquest/hooks/actions/useDropLoot"
import { useProgression } from "@neverquest/hooks/actions/useProgression"
import { useTimer } from "@neverquest/hooks/useTimer"
import { isLooting, lootingDuration } from "@neverquest/state/character"
import { isIncapacitated } from "@neverquest/state/reserves"

export function Loot() {
	const isIncapacitatedValue = useRecoilValue(isIncapacitated)
	const isLootingValue = useRecoilValue(isLooting)
	const setLootingDuration = useSetRecoilState(lootingDuration)

	const autoIncreaseStage = useAutoIncreaseStage()
	const dropLoot = useDropLoot()
	const progression = useProgression()

	useTimer({
		onElapsed: () => {
			dropLoot()
			progression()
			autoIncreaseStage()
		},
		setDuration: setLootingDuration,
		stop: isIncapacitatedValue || !isLootingValue,
	})

	return (
		<Stack gap={3}>
			<Looting />

			<LootDisplay />
		</Stack>
	)
}
