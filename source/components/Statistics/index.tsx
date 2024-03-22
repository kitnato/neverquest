import { useLayoutEffect, useRef, useState } from "react"
import { Card, CardBody, Col, Row, Stack } from "react-bootstrap"

import { BleedRating } from "@neverquest/components/Statistics/BleedRating"
import { BlockChance } from "@neverquest/components/Statistics/BlockChance"
import { CriticalRating } from "@neverquest/components/Statistics/CriticalRating"
import { Damage } from "@neverquest/components/Statistics/Damage"
import { DeflectionChance } from "@neverquest/components/Statistics/DeflectionChance"
import { DodgeChance } from "@neverquest/components/Statistics/DodgeChance"
import { ExecutionThreshold } from "@neverquest/components/Statistics/ExecutionThreshold"
import { ParryRating } from "@neverquest/components/Statistics/ParryRating"
import { Protection } from "@neverquest/components/Statistics/Protection"
import { Range } from "@neverquest/components/Statistics/Range"
import { StaggerRating } from "@neverquest/components/Statistics/StaggerRating"
import { StunRating } from "@neverquest/components/Statistics/StunRating"
import { Thorns } from "@neverquest/components/Statistics/Thorns"

export function Statistics() {
	const element = useRef<HTMLDivElement | null>(null)
	const [isVisible, setIsVisible] = useState(false)

	const setVisibleOnTextChange = () => {
		const { current } = element

		if (current?.textContent?.trim() !== "") {
			setIsVisible(true)
		}
	}

	useLayoutEffect(() => {
		const { current } = element

		if (current !== null) {
			new MutationObserver(setVisibleOnTextChange).observe(current, {
				childList: true,
				subtree: true,
			})

			setVisibleOnTextChange()
		}
	}, [])

	return (
		<Card className={isVisible ? "" : "d-none "} ref={element}>
			<CardBody>
				<Row>
					<Col>
						<Stack gap={3}>
							<Damage />

							<CriticalRating />

							<StunRating />

							<BleedRating />

							<ParryRating />

							<ExecutionThreshold />

							<Range />
						</Stack>
					</Col>

					<Col>
						<Stack gap={3}>
							<Protection />

							<Thorns />

							<DeflectionChance />

							<DodgeChance />
						</Stack>
					</Col>

					<Col>
						<Stack gap={3}>
							<BlockChance />

							<StaggerRating />
						</Stack>
					</Col>
				</Row>
			</CardBody>
		</Card>
	)
}
