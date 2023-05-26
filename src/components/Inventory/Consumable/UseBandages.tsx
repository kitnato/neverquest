import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";
import { useHeal } from "@neverquest/hooks/actions/useHeal";
import { isHealthAtMaximum } from "@neverquest/state/reserves";

export function UseBandages() {
  const isHealthAtMaximumValue = useRecoilValue(isHealthAtMaximum);

  const heal = useHeal();

  return (
    <OverlayTrigger
      overlay={<Tooltip>{isHealthAtMaximumValue && <div>Already at full health!</div>}</Tooltip>}
      trigger={isHealthAtMaximumValue ? [] : ["hover", "focus"]}
    >
      <span>
        <Button disabled={!isHealthAtMaximumValue} onClick={heal} variant="outline-dark">
          Heal
        </Button>
      </span>
    </OverlayTrigger>
  );
}
