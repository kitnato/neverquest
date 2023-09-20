import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { deltas } from "@neverquest/state/deltas";
import { encumbrance, encumbranceMaximum } from "@neverquest/state/inventory";

export function Encumbrance() {
  const encumbranceValue = useRecoilValue(encumbrance);
  const encumbranceMaximumValue = useRecoilValue(encumbranceMaximum);

  const deltaEncumbrance = deltas("encumbrance");

  useDeltaText({
    delta: deltaEncumbrance,
    value: encumbranceMaximum,
  });

  return (
    <Stack className="w-100" direction="horizontal">
      <IconDisplay contents="" Icon={IconEncumbrance} tooltip="Encumbrance" />

      <FloatingText deltaType="encumbrance" />

      <div className="w-100">
        <LabelledProgressBar
          label={`${encumbranceValue}/${encumbranceMaximumValue}`}
          value={(encumbranceValue / encumbranceMaximumValue) * 100}
          variant="dark"
        />
      </div>
    </Stack>
  );
}
