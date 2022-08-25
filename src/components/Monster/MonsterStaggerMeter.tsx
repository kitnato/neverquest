import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isMonsterStaggered } from "@neverquest/state/monster";
import { totalStaggerRate } from "@neverquest/state/statistics";
import { UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/helpers";

export default function () {
  const [isStaggeredValue, setStaggered] = useRecoilState(isMonsterStaggered);
  const totalStaggerRateValue = useRecoilValue(totalStaggerRate);
  const [deltaStagger, setDeltaStagger] = useState(0);

  useAnimation((delta) => {
    setDeltaStagger((current) => current + delta);
  }, !isStaggeredValue);

  useEffect(() => {
    if (deltaStagger >= totalStaggerRateValue) {
      setDeltaStagger(0);
      setStaggered(false);
    }
  }, [deltaStagger, totalStaggerRateValue]);

  useEffect(() => {
    if (!isStaggeredValue) {
      setDeltaStagger(0);
    }
  }, [isStaggeredValue]);

  return (
    <LabelledProgressBar
      disableTransitions
      label={formatMilliseconds(totalStaggerRateValue - deltaStagger)}
      value={(deltaStagger / totalStaggerRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}
