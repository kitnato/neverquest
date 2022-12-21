import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import IconImage from "@neverquest/components/IconImage";
import useTransactResources from "@neverquest/hooks/actions/useTransactResources";
import { ReactComponent as Icon } from "@neverquest/icons/locked-chest.svg";
import { isLevelCompleted } from "@neverquest/state/encounter";
import { hasLooted } from "@neverquest/state/resources";
import { AnimationType, UIVariant } from "@neverquest/types/ui";
import { getAnimationClass } from "@neverquest/utilities/getters";

export default function ({ isDisabled }: { isDisabled: boolean }) {
  const hasLootedValue = useRecoilValue(hasLooted);
  const isLevelCompletedValue = useRecoilValue(isLevelCompleted);

  const transactResources = useTransactResources();

  if (hasLootedValue || !isLevelCompletedValue) {
    return null;
  }

  return (
    <OverlayTrigger overlay={<Tooltip>Collect loot</Tooltip>} placement="top">
      <span
        className={`d-inline-block ${getAnimationClass({
          type: AnimationType.BounceIn,
        })}`}
      >
        <Button
          className={`${getAnimationClass({ isInfinite: true, type: AnimationType.Pulse })}`}
          disabled={isDisabled}
          onClick={() => transactResources({})}
          variant={UIVariant.Outline}
        >
          <IconImage Icon={Icon} />
        </Button>
      </span>
    </OverlayTrigger>
  );
}
