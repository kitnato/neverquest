import { useRecoilValue } from "recoil";

import { TraitDisplay } from "@neverquest/components/Traits/TraitDisplay";
import { acquiredTraits } from "@neverquest/state/traits";
import { TRAIT_TYPES } from "@neverquest/types/unions";

export function Traits() {
  const acquiredTraitsValue = useRecoilValue(acquiredTraits);

  return Object.values(acquiredTraitsValue).every((current) => !current) ? (
    <span className="fst-italic">None.</span>
  ) : (
    TRAIT_TYPES.map((current) =>
      acquiredTraitsValue[current] ? <TraitDisplay key={current} trait={current} /> : null,
    )
  );
}
