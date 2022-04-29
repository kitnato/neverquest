import Stack from "react-bootstrap/Stack";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import ResourceMeter from "neverquest/components/ResourceMeter";
import icon from "neverquest/icons/abstract-013.svg";
import { experience, experienceSpent } from "neverquest/state/character";
import { deltaExperienceSpent } from "neverquest/state/deltas";

export default function ExperienceStatus() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Spent XP" />

      <Stack className="w-100" direction="horizontal">
        <ResourceMeter atom={experienceSpent} atomMaximum={experience} />

        <FloatingText atom={deltaExperienceSpent} exitToLeft />
      </Stack>
    </Stack>
  );
}
