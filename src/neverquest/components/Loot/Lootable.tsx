import { RecoilState, useRecoilValue } from "recoil";

import { UIAnimationType } from "neverquest/env";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function Lootable({
  atom,
  Component,
}: {
  atom: RecoilState<number>;
  Component: React.ElementType;
}) {
  const resourceValue = useRecoilValue(atom);

  if (resourceValue === 0) {
    return null;
  }

  return <Component className={getAnimationClass(UIAnimationType.FlipInX)} value={resourceValue} />;
}
