import { isStackable } from "@neverquest/types/type-guards";
import type { Animation, AnimationSpeed } from "@neverquest/types/ui";
import { CLASS_ANIMATED, CLASS_ANIMATE_PREFIX } from "@neverquest/utilities/constants";

export function animateElement({
  element,
  onEnd,
  speed,
  type,
}: {
  element: HTMLElement | null;
  onEnd?: () => void;
  speed?: AnimationSpeed;
  type: Animation;
}) {
  if (element === null) {
    return;
  }

  const { classList } = element;
  const animationName = `${CLASS_ANIMATE_PREFIX}${type}`;
  const animationSpeedClass = speed ? `${CLASS_ANIMATE_PREFIX}${speed}` : null;

  if (classList.contains("d-none")) {
    classList.remove("d-none");
  }

  classList.add(CLASS_ANIMATED, animationName);

  if (animationSpeedClass !== null) {
    classList.add(animationSpeedClass);
  }

  element.addEventListener(
    "animationend",
    (event: AnimationEvent) => {
      event.stopPropagation();
      classList.remove(CLASS_ANIMATED, animationName);

      if (animationSpeedClass !== null) {
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

  items.forEach((item) => {
    if (isStackable(item)) {
      const existingStackIndex = stacker.findIndex(
        ({ item: stackedItem }) => isStackable(stackedItem) && stackedItem.type === item.type,
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
  });

  return stacker;
}
