import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { CLASS_TABLE_CELL_ITALIC, LABEL_EMPTY } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconMight } from "@neverquest/icons/might.svg";
import { ReactComponent as IconStunRating } from "@neverquest/icons/stun-rating.svg";
import { ReactComponent as IconStun } from "@neverquest/icons/stun.svg";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/items";
import { masteryStatistic } from "@neverquest/state/masteries";
import { skills } from "@neverquest/state/skills";
import { stunRating } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

export function StunRating() {
  const mightValue = useRecoilValue(masteryStatistic("might"));
  const stunRatingValue = useRecoilValue(stunRating);
  const traumatologyValue = useRecoilValue(skills("traumatology"));
  const { abilityChance, gearClass } = useRecoilValue(weapon);

  useDeltaText({
    delta: deltas("stunRating"),
    stop: ({ previous }) => previous === null || !traumatologyValue,
    value: stunRating,
  });

  if (!traumatologyValue || gearClass !== "blunt") {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Stun rating details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Chance:</td>

                      <td>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconStun} size="small" />

                          {formatValue({ format: "percentage", value: abilityChance })}
                        </Stack>
                      </td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconMight} size="small" />
                          Might:
                        </Stack>
                      </td>

                      <td>{`${mightValue} hits`}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={traumatologyValue ? ["hover", "focus"] : []}
          >
            <span>{traumatologyValue ? stunRatingValue : LABEL_EMPTY}</span>
          </OverlayTrigger>

          <FloatingText delta="stunRating" />
        </Stack>
      }
      Icon={IconStunRating}
      isAnimated
      tooltip="Stun rating"
    />
  );
}
