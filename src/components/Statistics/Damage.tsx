import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DamageDetails } from "@neverquest/components/Statistics/DamageDetails";
import { DamagePerSecond } from "@neverquest/components/Statistics/DamagePerSecond";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDamage } from "@neverquest/icons/damage.svg";
import { isShowing } from "@neverquest/state/isShowing";
import { damageTotal } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

export function Damage() {
  const damageTotalValue = useRecoilValue(damageTotal);
  const isShowingDamageDetails = useRecoilValue(isShowing("damageDetails"));

  useDeltaText({
    delta: "damage",
    value: damageTotal,
  });

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">Total damage details</PopoverHeader>

                <PopoverBody>
                  <DamageDetails />
                </PopoverBody>
              </Popover>
            }
            trigger={isShowingDamageDetails ? ["hover", "focus"] : []}
          >
            <span>{formatValue({ value: damageTotalValue })}</span>
          </OverlayTrigger>

          <FloatingTextQueue delta="damage" />
        </Stack>
      }
      description={<DamagePerSecond />}
      Icon={IconDamage}
      tooltip="Total damage"
    />
  );
}
