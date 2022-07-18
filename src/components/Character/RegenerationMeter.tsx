import { Atom, useSetAtom, useAtomValue, WritableAtom } from "jotai";
import { useEffect, useState } from "react";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";

import useAnimation from "@neverquest/hooks/useAnimation";
import { isRecovering } from "@neverquest/state/character";
import { UIAttachment, UISize, UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/helpers";

export default function RegenerationMeter({
  atomReserve,
  isReserveMaxedOut,
  regenerationRate,
}: {
  atomReserve: WritableAtom<null, number>;
  isReserveMaxedOut: Atom<boolean>;
  regenerationRate: Atom<number>;
}) {
  const isRecoveringValue = useAtomValue(isRecovering);
  const regenerationRateValue = useAtomValue(regenerationRate);
  const isReserveMaxedOutValue = useAtomValue(isReserveMaxedOut);
  const changeCurrentReserve = useSetAtom(atomReserve);
  const [deltaRegeneration, setDeltaRegeneration] = useState(0);

  useAnimation((delta) => {
    setDeltaRegeneration((current) => current + delta);
  }, isReserveMaxedOutValue || isRecoveringValue);

  useEffect(() => {
    if (deltaRegeneration >= regenerationRateValue) {
      setDeltaRegeneration(0);
      changeCurrentReserve(1);
    }
  }, [deltaRegeneration, regenerationRateValue]);

  // Catches any leftover increments after regeneration is complete.
  useEffect(() => {
    if (deltaRegeneration > 0 && isReserveMaxedOutValue) {
      setDeltaRegeneration(0);
    }
  }, [deltaRegeneration, isReserveMaxedOutValue]);

  const label = (() => {
    if (isRecoveringValue) {
      return "Recovering ...";
    }

    return `${
      deltaRegeneration === 0
        ? "Regeneration"
        : `Regenerating ${formatMilliseconds(regenerationRateValue - deltaRegeneration)}`
    } (${formatMilliseconds(regenerationRateValue)})`;
  })();

  return (
    <LabelledProgressBar
      attached={UIAttachment.Above}
      disableTransitions
      label={label}
      size={UISize.Tiny}
      value={(deltaRegeneration / regenerationRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
