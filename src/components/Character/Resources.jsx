import React from "react";
import { useRecoilValue } from "recoil";

import Display from "components/Loot/Display";

import { looted } from "state/atoms";

export default function Resources() {
  const hasLooted = useRecoilValue(looted);

  return hasLooted && <Display isInventory />;
}
