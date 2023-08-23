import { Button } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { useApplyGem } from "@neverquest/hooks/actions/useApplyGem";
import { canApplyGem } from "@neverquest/state/inventory";
import type { GemItem } from "@neverquest/types";

export function ApplyGem({ gem }: { gem: GemItem }) {
  const canApplyGemValue = useRecoilValue(canApplyGem);

  const applyGem = useApplyGem();

  return (
    <Button disabled={!canApplyGemValue} onClick={() => applyGem(gem)} variant="outline-dark">
      Apply
    </Button>
  );
}
