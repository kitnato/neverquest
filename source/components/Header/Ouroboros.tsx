import { useState } from "react";

import { IconImage } from "@neverquest/components/IconImage";
import IconOuroboros from "@neverquest/icons/ouroboros.svg?react";

export function Ouroboros() {
  const [isAttuned, setIsAttuned] = useState(false);

  return (
    <IconImage
      className={`text-light${isAttuned ? " glowing" : ""}`}
      Icon={IconOuroboros}
      onClick={() => {
        setIsAttuned((current) => !current);
      }}
    />
  );
}
