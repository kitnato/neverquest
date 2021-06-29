import React from "react";
import { useRecoilValue } from "recoil";

import WithIcon from "components/WithIcon";

import scrapIcon from "icons/shattered-sword.svg";

export default function Scrap({ atom }) {
  const scrapValue = useRecoilValue(atom);

  return (
    scrapValue > 0 && (
      <WithIcon icon={scrapIcon} alt="Scrap">
        {scrapValue}
      </WithIcon>
    )
  );
}
