import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ElementalDetails } from "@neverquest/components/Statistics/ElementalDetails";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconThorns from "@neverquest/icons/thorns.svg?react";
import { thorns } from "@neverquest/state/statistics";

export function Thorns() {
  const thornsValue = useRecoilValue(thorns);

  useDeltaText({
    delta: "thorns",
    value: thorns,
  });

  if (thornsValue === 0) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <PopoverHeader className="text-center">Thorns details</PopoverHeader>

                <PopoverBody>
                  <DetailsTable>
                    <ElementalDetails slot="armor" />
                  </DetailsTable>
                </PopoverBody>
              </Popover>
            }
          >
            <span>{thornsValue}</span>
          </OverlayTrigger>

          <FloatingTextQueue delta="thorns" />
        </Stack>
      }
      Icon={IconThorns}
      tooltip="Thorns"
    />
  );
}
