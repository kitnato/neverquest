import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { ExpandKnapsack } from "@neverquest/components/Caravan/Tailor/ExpandKnapsack"
import { ownedItem } from "@neverquest/state/inventory"

export function Tailor() {
	const ownedItemKnapsack = useRecoilValue(ownedItem("knapsack"))

	if (ownedItemKnapsack === undefined) {
		return <span>&quot;I&apos;m feeling a bit useless here ...&quot;</span>
	}

	return (
		<Stack gap={5}>
			<ExpandKnapsack />
		</Stack>
	)
}
