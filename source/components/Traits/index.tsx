import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { TraitDisplay } from "@neverquest/components/Traits/TraitDisplay";
import { LABEL_NONE } from "@neverquest/data/general";
import { acquiredTraits } from "@neverquest/state/traits";
import { TRAIT_TYPES } from "@neverquest/types/unions";

export function Traits() {
  const acquiredTraitsValue = useRecoilValue(acquiredTraits);

  return (
    <Stack gap={3}>
      {Object.values(acquiredTraitsValue).every((hasAcquiredTrait) => !hasAcquiredTrait) ? (
        <span className="fst-italic">{LABEL_NONE}</span>
      ) : (
        TRAIT_TYPES.map((trait) =>
          acquiredTraitsValue[trait] ? <TraitDisplay key={trait} trait={trait} /> : undefined,
        )
      )}
    </Stack>
  );
}
