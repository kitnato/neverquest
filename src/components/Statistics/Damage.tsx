import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DamageDetails } from "@neverquest/components/Statistics/DamageDetails";
import { DamagePerSecond } from "@neverquest/components/Statistics/DamagePerSecond";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDamage } from "@neverquest/icons/damage.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { damageTotal } from "@neverquest/state/statistics";

export function Damage() {
  const damageTotalValue = useRecoilValue(damageTotal);
  const isShowingDamageDetails = useRecoilValue(isShowing("damageDetails"));

  useDeltaText({
    delta: deltas("damage"),
    value: damageTotal,
  });

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Total damage details</Popover.Header>

                <Popover.Body>
                  <DamageDetails />
                </Popover.Body>
              </Popover>
            }
            trigger={isShowingDamageDetails ? ["hover", "focus"] : []}
          >
            <span>{damageTotalValue}</span>
          </OverlayTrigger>

          <FloatingText delta="damage" />
        </Stack>
      }
      description={<DamagePerSecond />}
      Icon={IconDamage}
      tooltip="Total damage"
    />
  );
}
