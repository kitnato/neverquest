import { useState } from "react"
import { Button, Card, CardBody, Stack } from "react-bootstrap"
import { useSetRecoilState } from "recoil"

import { IconImage } from "@neverquest/components/IconImage"
import { Typewriter } from "@neverquest/components/Typewriter"
import { LEVELLING_MAXIMUM } from "@neverquest/data/general"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import IconAwakening from "@neverquest/icons/awakening.svg?react"
import { consciousness } from "@neverquest/state/character"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Awakening() {
	const setConsciousness = useSetRecoilState(consciousness)

	const [isShowingChoice, setIsShowingChoice] = useState(false)
	const [isShowingText, setIsShowingText] = useState(false)

	const progressQuest = useProgressQuest()

	return (
		<Card
			className={`m-auto ${getAnimationClass({ animation: "zoomIn", speed: "slower" })}`}
			onAnimationEnd={() => { setIsShowingText(true) }}
			style={{ width: 777 }}
		>
			<CardBody>
				<Stack className="align-items-center" gap={4}>
					<IconImage Icon={IconAwakening} />

					{isShowingText && (
						<Typewriter
							onEnd={() => { setIsShowingChoice(true) }}
							text={`... System failure. Subject ${LEVELLING_MAXIMUM} has bypassed containment cipher. Protocol?`}
						/>
					)}

					{isShowingChoice && (
						<Stack
							className={`mx-auto ${getAnimationClass({ animation: "flipInX" })}`}
							direction="horizontal"
							gap={3}
							style={{ width: 400 }}
						>
							<Button
								className="w-50"
								onClick={() => {
									setConsciousness("somnium")
									progressQuest({ quest: "deciding" })
								}}
								variant="outline-dark"
							>
								<span>Grind</span>
							</Button>

							<Button
								className="w-50"
								onClick={() => {
									setConsciousness("mors")
								}}
								variant="outline-dark"
							>
								<span className="monospaced">Die</span>
							</Button>
						</Stack>
					)}
				</Stack>
			</CardBody>
		</Card>
	)
}
