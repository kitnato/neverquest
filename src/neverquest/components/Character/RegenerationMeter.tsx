import { Atom, useSetAtom, useAtomValue, WritableAtom, PrimitiveAtom } from "jotai";
import { useEffect, useState } from "react";

import LabelledProgressBar from "neverquest/components/LabelledProgressBar";

import useAnimation from "neverquest/hooks/useAnimation";
import { isRecovering } from "neverquest/state/character";
import {
  DeltaDisplay,
  UIAttachment,
  FloatingTextType,
  UISize,
  UIVariant,
} from "neverquest/types/ui";
import { formatMilliseconds } from "neverquest/utilities/helpers";

export default function RegenerationMeter({
  regenerationRate,
  atomReserve,
  atomReserveDelta,
  isReserveMaxedOut,
}: {
  regenerationRate: Atom<number>;
  atomReserve: PrimitiveAtom<number>;
  atomReserveDelta: WritableAtom<DeltaDisplay, DeltaDisplay>;
  isReserveMaxedOut: Atom<boolean>;
}) {
  const isRecoveringValue = useAtomValue(isRecovering);
  const regenerationRateValue = useAtomValue(regenerationRate);
  const isReserveMaxedOutValue = useAtomValue(isReserveMaxedOut);
  const setCurrentReserve = useSetAtom(atomReserve);
  const setDeltaReserve = useSetAtom(atomReserveDelta);
  const [deltaRegeneration, setDeltaRegeneration] = useState(0);

  useAnimation((delta) => {
    setDeltaRegeneration((current) => current + delta);
  }, isReserveMaxedOutValue || isRecoveringValue);

  useEffect(() => {
    if (deltaRegeneration >= regenerationRateValue) {
      setDeltaRegeneration(0);
      // TODO - make health regeneration amount either a constant or an atom if it could be variable
      setCurrentReserve((current) => current + 1);
      setDeltaReserve({
        color: FloatingTextType.Positive,
        value: "+1",
      });
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
