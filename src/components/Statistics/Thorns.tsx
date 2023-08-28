import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ElementalDetails } from "@neverquest/components/Statistics/ElementalDetails";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconThorns } from "@neverquest/icons/thorns.svg";
import { deltas } from "@neverquest/state/deltas";
import { thorns } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";

export function Thorns() {
  const isShowingThornsValue = useRecoilValue(isShowing("thorns"));
  const thornsValue = useRecoilValue(thorns);

  useDeltaText({
    atomDelta: deltas("thorns"),
    atomValue: thorns,
  });

  if (!isShowingThornsValue) {
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

          <FloatingText deltaType="thorns" />
        </Stack>
      }
      Icon={IconThorns}
      iconProps={{ ignoreColor: true, overlayPlacement: "bottom", size: "tiny" }}
      tooltip="Thorns"
    />
  );
}
