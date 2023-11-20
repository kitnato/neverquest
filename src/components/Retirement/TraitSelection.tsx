import { FormCheck, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { TraitDisplay } from "@neverquest/components/Traits/TraitDisplay";
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
            label={<span className="fst-italic">None.</span>}
            name={FORM_NAME}
            onChange={resetSelectedTrait}
            type="radio"
          />

          {TRAIT_TYPES.map(
            (current) =>
              !acquiredTraitsValue[current] && (
                <FormCheck
                  checked={selectedTraitValue === current}
                  id={current}
                  key={current}
                  label={<TraitDisplay key={current} trait={current} />}
                  name={FORM_NAME}
                  onChange={({ target: { value } }) => {
                    setSelectedTrait(value as Trait);
                  }}
                  type="radio"
                  value={current}
                />
              ),
          )}
        </Stack>
      )}
    </Stack>
  );
}
