import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { isLevelCompleted, isWilderness, progress } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";
import { UIVariant } from "@neverquest/types/ui";

export default function () {
  const hasLootedValue = useRecoilValue(hasLooted);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);
  const isWildernessValue = useRecoilValue(isWilderness);
  const setProgress = useSetRecoilState(progress);

  const canLure = hasLootedValue && isLevelCompletedValue && isWildernessValue;

  return (
    <>
      <OverlayTrigger
        overlay={<Tooltip>Requires a clear wilderness.</Tooltip>}
        placement="top"
        trigger={!canLure ? ["focus", "hover"] : []}
      >
        <span className={"d-inline-block"}>
          <Button disabled={!canLure} onClick={() => setProgress(0)} variant={UIVariant.Outline}>
            Use
          </Button>
        </span>
      </OverlayTrigger>
    </>
  );
}
