import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/barbed-sun.svg";
import { experience } from "state/character";

export default function Experience() {
  const experienceValue = useRecoilValue(experience);
  const showSpent = experienceValue.spent > 0;

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon
        icon={icon}
        tooltip={`Experience${showSpent ? " (spent)" : ""}`}
      />

      <span>
        {`${experienceValue.total} ${
          showSpent ? ` (${experienceValue.spent})` : ""
        }`}
      </span>
    </Stack>
  );
}
