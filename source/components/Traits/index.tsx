import { useRecoilValue } from "recoil";

import { TraitDisplay } from "@neverquest/components/Traits/TraitDisplay";
import { acquiredTraits } from "@neverquest/state/traits";
import { TRAIT_TYPES } from "@neverquest/types/unions";

export function Traits() {
  const acquiredTraitsValue = useRecoilValue(acquiredTraits);

  return Object.values(acquiredTraitsValue).every((hasAcquiredTrait) => !hasAcquiredTrait) ? (
    <span className="fst-italic">None.</span>
  ) : (
    TRAIT_TYPES.map((trait) =>
      acquiredTraitsValue[trait] ? <TraitDisplay key={trait} trait={trait} /> : undefined,
    )
  );
}
