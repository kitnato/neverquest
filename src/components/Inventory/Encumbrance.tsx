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

  useDeltaText({
    delta: deltas("encumbranceMaximum"),
    value: encumbranceMaximum,
  });

  return (
    <Stack direction="horizontal">
      <IconDisplay contents="" Icon={IconEncumbrance} tooltip="Encumbrance" />

      <LabelledProgressBar
        label={
          <Stack direction="horizontal">
            {`${encumbranceValue}/${encumbranceMaximumValue}`}

            <FloatingText delta="encumbranceMaximum" />
          </Stack>
        }
        value={(encumbranceValue / encumbranceMaximumValue) * 100}
        variant="dark"
      />
    </Stack>
  );
}
