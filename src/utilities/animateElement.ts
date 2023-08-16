import type { Animation, AnimationSpeed } from "@neverquest/types/ui";
import { CLASS_ANIMATED, CLASS_ANIMATE_PREFIX } from "@neverquest/utilities/constants";

export function animateElement({
  element,
  speed,
  type,
}: {
  element: HTMLElement | null;
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
    },
    { once: true },
  );
}
