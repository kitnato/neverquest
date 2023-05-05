import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconAttributePoints } from "@neverquest/icons/attribute-points.svg";
import { attributePoints } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { DeltaType } from "@neverquest/types/enums";

export function AttributePoints() {
  const attributePointsValue = useRecoilValue(attributePoints);

  const deltaAttributePoints = deltas(DeltaType.AttributePoints);

  useDeltaText({
    atomDelta: deltaAttributePoints,
    atomValue: attributePoints,
  });

  return (
    <IconDisplay
      contents={
        <>
          <span>{attributePointsValue}</span>

          <FloatingText type={DeltaType.AttributePoints} />
        </>
      }
      Icon={IconAttributePoints}
      tooltip="Available attribute points"
    />
  );
}
