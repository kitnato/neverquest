import { CLASS_ANIMATED, CLASS_ANIMATE_PREFIX } from "@neverquest/data/general"
import { isStackableItem } from "@neverquest/types/type-guards"

import type { Animation, AnimationSpeed } from "@neverquest/types/ui"
import type { StateKey } from "@neverquest/types/unions"

export function animateElement({
	animation,
	element,
	onAnimationEnd,
	speed,
}: {
	animation: Animation
	element: HTMLElement | null
	onAnimationEnd?: () => void
	speed?: AnimationSpeed
}) {
	if (element === null) {
		return
	}

	const { classList } = element
	const animationName = `${CLASS_ANIMATE_PREFIX}${animation}`
	const animationSpeedClass = speed ? `${CLASS_ANIMATE_PREFIX}${speed}` : undefined

	classList.add(CLASS_ANIMATED, animationName)

	if (animationSpeedClass !== undefined) {
		classList.add(animationSpeedClass)
	}

	element.addEventListener(
		"animationend",
		(event: AnimationEvent) => {
			event.stopPropagation()

			classList.remove(CLASS_ANIMATED, animationName)

			if (animationSpeedClass !== undefined) {
				classList.remove(animationSpeedClass)
			}

			if (onAnimationEnd !== undefined) {
				onAnimationEnd()
			}
		},
		{ once: true },
	)
}

export function stackItems<ItemType>(items: ItemType[]) {
	const stackedItems: { amount: number, item: ItemType }[] = []

	for (const item of items) {
		if (isStackableItem(item)) {
			const existingStackIndex = stackedItems.findIndex(
				({ item: stackedItem }) => isStackableItem(stackedItem) && stackedItem.name === item.name,
			)

			if (existingStackIndex === -1) {
				stackedItems.push({ amount: 1, item })
			}
			else {
				stackedItems.splice(existingStackIndex, 1, {
					amount: (stackedItems[existingStackIndex] ?? { amount: 1 }).amount + 1,
					item,
				})
			}
		}
		else {
			stackedItems.push({ amount: 1, item })
		}
	}

	return stackedItems
}

export function withStateKey<State>(key: StateKey, assign: (key: StateKey) => State) {
	return assign(key)
}
