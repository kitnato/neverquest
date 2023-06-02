import { useState } from "react";
import { Button } from "react-bootstrap";

import { useShowEverything } from "@neverquest/hooks/actions/useShowEverything";

export function ShowEverything() {
  const [isShowingEverything, setIsShowingEverything] = useState(false);

  const showEverything = useShowEverything();

  const handleToggle = () => {
    showEverything();
    setIsShowingEverything(true);
  };

  return (
    <Button disabled={isShowingEverything} onClick={handleToggle} variant="outline-dark">
      Show everything
    </Button>
  );
}
