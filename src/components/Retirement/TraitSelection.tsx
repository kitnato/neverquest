import { useState } from "react";
import { Form, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { TraitDisplay } from "@neverquest/components/Traits/TraitDisplay";
import { acquiredTraits } from "@neverquest/state/traits";
import { TRAIT_TYPES } from "@neverquest/types/unions";

const FORM_NAME = "trait-selection";

export function TraitSelection() {
  const acquiredTraitsValue = useRecoilValue(acquiredTraits);

  const [selectedTrait, setSelectedTrait] = useState("none");

  const areAllTraitsAcquired = Object.values(acquiredTraitsValue).every(Boolean);

  return (
    <Stack gap={3}>
      <h6>Trait selection</h6>

      {areAllTraitsAcquired ? (
        <span className="fst-italic">All traits acquired.</span>
      ) : (
        <Stack gap={3}>
          <Form.Check
            checked={selectedTrait === "none"}
            id="none"
            label={<span className="fst-italic">None.</span>}
            name={FORM_NAME}
            onChange={({ target: { value } }) => setSelectedTrait(value)}
            type="radio"
            value="none"
          />

          {TRAIT_TYPES.map(
            (current) =>
              !acquiredTraitsValue[current] && (
                <Form.Check
                  checked={selectedTrait === current}
                  id={current}
                  key={current}
                  label={<TraitDisplay key={current} trait={current} />}
                  name={FORM_NAME}
                  onChange={({ target: { value } }) => setSelectedTrait(value)}
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
