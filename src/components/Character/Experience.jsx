import React from "react";
import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";
import { experience } from "state/atoms";

import experienceIcon from "icons/barbed-sun.svg";

export default function Experience() {
  const experienceValue = useRecoilValue(experience);

  return (
    <WithIcon icon={experienceIcon} alt="Experience">
      {experienceValue}
    </WithIcon>
  );
}
