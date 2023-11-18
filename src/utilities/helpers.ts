import { CLASS_ANIMATED, CLASS_ANIMATE_PREFIX } from "@neverquest/data/general";
import { isStackableItem } from "@neverquest/types/type-guards";
import type { Animation, AnimationSpeed } from "@neverquest/types/ui";
import type { StateKey } from "@neverquest/types/unions";

export function animateElement({
  element,
  name,
  onEnd,
  speed,
}: {
  element: HTMLElement | null;
  name: Animation;
  onEnd?: () => void;
  speed?: AnimationSpeed;
}) {
  if (element === null) {
    return;
  }

  const { classList } = element;
  const animationName = `${CLASS_ANIMATE_PREFIX}${name}`;
  const animationSpeedClass = speed ? `${CLASS_ANIMATE_PREFIX}${speed}` : undefined;

  if (classList.contains("d-none")) {
    classList.remove("d-none");
  }

  classList.add(CLASS_ANIMATED, animationName);

  if (animationSpeedClass !== undefined) {
    classList.add(animationSpeedClass);
  }

  element.addEventListener(
    "animationend",
    (event: AnimationEvent) => {
      event.stopPropagation();
      classList.remove(CLASS_ANIMATED, animationName);

      if (animationSpeedClass !== undefined) {
        classList.remove(animationSpeedClass);
      }

      if (onEnd !== undefined) {
        onEnd();
      }
    },
    { once: true },
  );
}

export function stackItems<ItemType>(items: ItemType[]) {
  const stacker: { item: ItemType; stack: number }[] = [];

  for (const item of items) {
    if (isStackableItem(item)) {
      const existingStackIndex = stacker.findIndex(
        ({ item: stackedItem }) => isStackableItem(stackedItem) && stackedItem.name === item.name,
      );

      if (existingStackIndex === -1) {
        stacker.push({ item, stack: 1 });
      } else {
        stacker.splice(existingStackIndex, 1, {
          item,
          stack: (stacker[existingStackIndex] ?? { stack: 1 }).stack + 1,
        });
      }
    } else {
      stacker.push({ item, stack: 1 });
    }
  }

  return stacker;
}

export function withStateKey<State>(key: StateKey, assign: (key: StateKey) => State) {
  return assign(key);
}
