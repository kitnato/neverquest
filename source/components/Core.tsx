import { nanoid } from "nanoid"
import { useState } from "preact/hooks"
import { RecoilRoot } from "recoil"

import { CenterScreen } from "@neverquest/components/CenterScreen"
import { CheatQuest } from "@neverquest/components/CheatQuest"
import { Header } from "@neverquest/components/Header"
import { Initializer } from "@neverquest/components/Initializer"
import { Layout } from "@neverquest/components/Layout"
import { SeedContext } from "@neverquest/state/seed"

export function Core() {
	const [seed, setSeed] = useState(nanoid())

	// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
	if (window.Worker === undefined) {
		return <CenterScreen>Requires enabled Web Workers.</CenterScreen>
	}

	return (
		<SeedContext.Provider
			value={() => {
				setSeed(nanoid())
			}}
		>
			<RecoilRoot key={seed}>
				<Initializer>
					<CheatQuest />

					<Header />

					<Layout />
				</Initializer>
			</RecoilRoot>
		</SeedContext.Provider>
	)
}
