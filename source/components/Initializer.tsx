import { useEffect } from "preact/hooks"

import { useInitialize } from "@neverquest/hooks/actions/useInitialize"

import type { ComponentChildren } from "preact"

export function Initializer({ children }: { children: ComponentChildren }) {
	const initialize = useInitialize()

	useEffect(initialize, [initialize])

	return <>{children}</>
}
