import { useEffect, useRef } from "preact/hooks"

export function usePreviousValue(value: number) {
	const reference = useRef<number | undefined>()

	useEffect(() => {
		reference.current = value
	}, [value])

	return reference.current
}
