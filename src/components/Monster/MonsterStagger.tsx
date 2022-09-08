import { useRecoilValue } from "recoil";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "@neverquest/components/ImageIcon";
import MonsterStaggerMeter from "@neverquest/components/Monster/MonsterStaggerMeter";
import { ReactComponent as Icon } from "@neverquest/icons/star-swirl.svg";
import { totalStaggerDuration } from "@neverquest/state/statistics";
import { skills } from "@neverquest/state/skills";
import { SkillStatus, SkillType } from "@neverquest/types/enums";

export default function () {
  const staggerSkill = useRecoilValue(skills(SkillType.Stagger));
  const totalStaggerDurationValue = useRecoilValue(totalStaggerDuration);

  if (staggerSkill !== SkillStatus.Trained || totalStaggerDurationValue === 0) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} tooltip="Staggered duration" />

      <MonsterStaggerMeter />
    </Stack>
  );
}
