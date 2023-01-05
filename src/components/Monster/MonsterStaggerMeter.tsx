import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isMonsterStaggered } from "@neverquest/state/monster";
import { staggerDuration } from "@neverquest/state/statistics";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export default function () {
  const [isStaggeredValue, setStaggered] = useRecoilState(isMonsterStaggered);
  const staggerDurationValue = useRecoilValue(staggerDuration);

  const [deltaStagger, setDeltaStagger] = useState(0);

  useAnimation((delta) => {
    setDeltaStagger((current) => current + delta);
  }, !isStaggeredValue);

  useEffect(() => {
    if (deltaStagger >= staggerDurationValue) {
      setDeltaStagger(0);
      setStaggered(false);
    }
  }, [deltaStagger, setStaggered, staggerDurationValue]);

  useEffect(() => {
    if (!isStaggeredValue) {
      setDeltaStagger(0);
    }
  }, [isStaggeredValue]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(staggerDurationValue - deltaStagger)}
      value={(deltaStagger / staggerDurationValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
