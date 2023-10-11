import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ElementalDetails } from "@neverquest/components/Statistics/ElementalDetails";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconThorns } from "@neverquest/icons/thorns.svg";
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
                <Popover.Header className="text-center">Thorns details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <ElementalDetails slot="armor" />
                  </DetailsTable>
                </Popover.Body>
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
