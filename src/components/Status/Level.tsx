import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconEssence } from "@neverquest/icons/essence.svg";
import { ReactComponent as IconLevel } from "@neverquest/icons/level.svg";
import { ReactComponent as IconPower } from "@neverquest/icons/tome-of-power.svg";
import { absorbedEssence, level } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { ownedItem } from "@neverquest/state/items";
import { formatValue } from "@neverquest/utilities/formatters";

export function Level() {
  const absorbedEssenceValue = useRecoilValue(absorbedEssence);
  const levelValue = useRecoilValue(level);
  const hasTomeOfPower = Boolean(useRecoilValue(ownedItem("tome of power")));

  useDeltaText({
    delta: deltas("level"),
    value: level,
  });

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Absorbed essence</Popover.Header>

                <Popover.Body>
                  <Stack className="justify-content-center" direction="horizontal" gap={1}>
                    <IconImage Icon={IconEssence} size="small" />

                    {formatValue({ value: absorbedEssenceValue })}
                  </Stack>
                </Popover.Body>
              </Popover>
            }
          >
            <span>{levelValue}</span>
          </OverlayTrigger>

          <FloatingText delta="level" />
        </Stack>
      }
      description={
        hasTomeOfPower && (
          <Stack direction="horizontal" gap={1}>
            <IconImage Icon={IconPower} size="small" />
            Empowered attribute effects.
          </Stack>
        )
      }
      Icon={IconLevel}
      tooltip="Power level"
    />
  );
}
