import { Button } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { useShowEverything } from "@neverquest/hooks/actions/useShowEverything";
import { isShowingEverything } from "@neverquest/state/isShowing";

export function ShowEverything() {
  const isShowingEverythingValue = useRecoilValue(isShowingEverything);

  const showEverything = useShowEverything();

  return (
    <Button disabled={isShowingEverythingValue} onClick={showEverything} variant="outline-dark">
      Show everything
    </Button>
  );
}
