import Stack from "react-bootstrap/Stack";

import AttributesList from "neverquest/components/Attributes/AttributesList";
import ExperienceSpent from "neverquest/components/Character/ExperienceSpent";

export default function Attributes() {
  return (
    <Stack gap={5}>
      <div className="position-sticky">
        <ExperienceSpent />
      </div>

      <AttributesList />
    </Stack>
  );
}
