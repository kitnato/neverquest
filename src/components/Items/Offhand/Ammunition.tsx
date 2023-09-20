import { useEffect } from "react";
import { Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { usePreviousValue } from "@neverquest/hooks/usePreviousValue";
import { ReactComponent as IconAmmunition } from "@neverquest/icons/ammunition.svg";
import { deltas } from "@neverquest/state/deltas";
import { ownedItem } from "@neverquest/state/items";
import type { TrinketItemAmmunitionPouch } from "@neverquest/types";

export function Ammunition() {
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));
  const setDelta = useSetRecoilState(deltas("ammunition"));

  const ammunition =
    ownedAmmunitionPouch === null
      ? 0
      : (ownedAmmunitionPouch as TrinketItemAmmunitionPouch).current;

  const previousAmmunition = usePreviousValue(ammunition);

  const difference = ammunition - (previousAmmunition ?? 0);
  const isPositive = difference > 0;

  useEffect(() => {
    if (previousAmmunition !== null && previousAmmunition !== ammunition) {
      setDelta({
        color: isPositive ? "text-success" : "text-danger",
        value: `${isPositive ? "+" : "-"}${difference}`,
      });
    }
  }, [ammunition, difference, isPositive, previousAmmunition, setDelta]);

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>{ammunition}</span>

          <FloatingText deltaType="ammunition" />
        </Stack>
      }
      Icon={IconAmmunition}
      isAnimated
      tooltip="Ammunition"
    />
  );
}
