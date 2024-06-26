import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { Caravan } from "@neverquest/components/Caravan"
import { Wilderness } from "@neverquest/components/Encounter/Wilderness"
import { Loot } from "@neverquest/components/Loot"
import { location } from "@neverquest/state/character"

export function Encounter() {
	const locationValue = useRecoilValue(location)

	if (locationValue === "wilderness") {
		return (
			<Stack gap={3}>
				<Wilderness />

				<Loot />
			</Stack>
		)
	}

	return <Caravan />
}
