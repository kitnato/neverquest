import Stack from "react-bootstrap/Stack";

import TrainableSkills from "@neverquest/components/Caravan/Mercenary/TrainableSkills";
import TrainedSkills from "@neverquest/components/Caravan/Mercenary/TrainedSkills";

export default function Mercenary() {
  return (
    <Stack gap={5}>
      <TrainableSkills />

      <TrainedSkills />
    </Stack>
  );
}
