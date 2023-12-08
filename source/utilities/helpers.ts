import { CLASS_ANIMATED, CLASS_ANIMATE_PREFIX } from "@neverquest/data/general";
import { isStackableItem } from "@neverquest/types/type-guards";
import type { Animation, AnimationSpeed } from "@neverquest/types/ui";
import type { StateKey } from "@neverquest/types/unions";

export function animateElement({
  animation,
  element,
  onEnd,
  speed,
}: {
  animation: Animation;
  element: HTMLElement | null;
  onEnd?: () => void;
  speed?: AnimationSpeed;
}) {
  if (element === null) {
    return;
  }

  const { classList } = element;
  const animationName = `${CLASS_ANIMATE_PREFIX}${animation}`;
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

export function isLocalStorageAvailable() {
  const storage = window.localStorage;

  if (storage.length === 0) {
    return false;
  }

  try {
    const test = "LOCAL_STORAGE_TEST";

    storage.setItem(test, test);
    storage.removeItem(test);

    return true;
  } catch {
    return false;
  }
}

export function stackItems<ItemType>(items: ItemType[]) {
  const stacker: { amount: number; item: ItemType }[] = [];

  for (const item of items) {
    if (isStackableItem(item)) {
      const existingStackIndex = stacker.findIndex(
        ({ item: stackedItem }) => isStackableItem(stackedItem) && stackedItem.name === item.name,
      );

      if (existingStackIndex === -1) {
        stacker.push({ amount: 1, item });
      } else {
        stacker.splice(existingStackIndex, 1, {
          amount: (stacker[existingStackIndex] ?? { amount: 1 }).amount + 1,
          item,
        });
      }
    } else {
      stacker.push({ amount: 1, item });
    }
  }

  return stacker;
}

export function withStateKey<State>(key: StateKey, assign: (key: StateKey) => State) {
  return assign(key);
}
