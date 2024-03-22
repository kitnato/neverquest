import { Accordion, AccordionHeader, AccordionItem, Stack } from "react-bootstrap"
import { useRecoilState, useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { MasteryDisplay } from "@neverquest/components/Masteries/MasteryDisplay"
import { ACCORDION_EVENT_KEY } from "@neverquest/data/general"
import IconMasteries from "@neverquest/icons/masteries.svg?react"
import { expandedMasteries, unlockedMasteries } from "@neverquest/state/masteries"
import type { Mastery } from "@neverquest/types/unions"

export function Masteries() {
	const [expandedMasteriesValue, setExpandedMasteries] = useRecoilState(expandedMasteries)
	const unlockedMasteriesValue = useRecoilValue(unlockedMasteries)

	if (Object.values(unlockedMasteriesValue).some(Boolean)) {
		return (
			<Accordion
				activeKey={expandedMasteriesValue ? ACCORDION_EVENT_KEY : undefined}
				onSelect={() => {
					setExpandedMasteries(isExpanded => !isExpanded)
				}}
			>
				<AccordionItem eventKey={ACCORDION_EVENT_KEY}>
					<AccordionHeader>
						<IconDisplay Icon={IconMasteries} tooltip="Masteries">
							<span>Masteries</span>
						</IconDisplay>
					</AccordionHeader>

					<Accordion.Body>
						<Stack gap={3}>
							{Object.entries(unlockedMasteriesValue)
								.toSorted(([mastery1], [mastery2]) => mastery1.localeCompare(mastery2))
								.toSorted(([, mastery1], [, mastery2]) => Number(mastery2) - Number(mastery1))
								.map(([mastery]) => (
									<MasteryDisplay key={mastery} mastery={mastery as Mastery} />
								))}
						</Stack>
					</Accordion.Body>
				</AccordionItem>
			</Accordion>
		)
	}
}
