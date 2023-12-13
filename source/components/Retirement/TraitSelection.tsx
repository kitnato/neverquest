import { FormCheck, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { TraitDisplay } from "@neverquest/components/Traits/TraitDisplay";
import { LABEL_NONE } from "@neverquest/data/general";
import { acquiredTraits, selectedTrait } from "@neverquest/state/traits";
import { TRAIT_TYPES, type Trait } from "@neverquest/types/unions";

const FORM_NAME = "trait-selection";

export function TraitSelection() {
  const acquiredTraitsValue = useRecoilValue(acquiredTraits);
  const [selectedTraitValue, setSelectedTrait] = useRecoilState(selectedTrait);
  const resetSelectedTrait = useResetRecoilState(selectedTrait);

  const areAllTraitsAcquired = Object.values(acquiredTraitsValue).every(Boolean);

  return (
    <Stack gap={3}>
      <h6>Trait selection</h6>

      {areAllTraitsAcquired ? (
        <span className="fst-italic">All traits acquired.</span>
      ) : (
        <Stack gap={3}>
          <FormCheck
            checked={selectedTraitValue === undefined}
            id="none"
            label={<span className="fst-italic">{LABEL_NONE}</span>}
            name={FORM_NAME}
            onChange={resetSelectedTrait}
            type="radio"
          />

          {TRAIT_TYPES.map(
            (trait) =>
              !acquiredTraitsValue[trait] && (
                <FormCheck
                  checked={selectedTraitValue === trait}
                  id={trait}
                  key={trait}
                  label={<TraitDisplay key={trait} trait={trait} />}
                  name={FORM_NAME}
                  onChange={({ target: { value } }) => {
                    setSelectedTrait(value as Trait);
                  }}
                  type="radio"
                  value={trait}
                />
              ),
          )}
        </Stack>
      )}
    </Stack>
  );
}
