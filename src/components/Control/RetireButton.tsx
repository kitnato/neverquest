import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { ReactComponent as Icon } from "@neverquest/icons/rocking-chair.svg";
import { isWilderness } from "@neverquest/state/encounter";
import { AnimationType, UIVariant } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

// TODO
export function RetireButton({ isDisabled }: { isDisabled: boolean }) {
  const isWildernessValue = useRecoilValue(isWilderness);

  const handleRetirement = () => {
    // TODO
  };

  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Retire</Tooltip>} placement="top" trigger={[]}>
        <span
          className={`d-inline-block ${getAnimationClass({
            type: AnimationType.BounceIn,
          })}`}
        >
          <Button
            disabled={isWildernessValue || isDisabled}
            onClick={handleRetirement}
            style={{ visibility: "hidden" }}
            variant={UIVariant.Outline}
          >
            <IconImage Icon={Icon} />
          </Button>
        </span>
      </OverlayTrigger>
    </>
  );
}
