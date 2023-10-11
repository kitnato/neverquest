import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingTextQueue } from "@neverquest/components/FloatingTextQueue";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { encumbrance, encumbranceMaximum } from "@neverquest/state/inventory";

export function Encumbrance() {
  const encumbranceValue = useRecoilValue(encumbrance);
  const encumbranceMaximumValue = useRecoilValue(encumbranceMaximum);

  useDeltaText({
    delta: "encumbranceMaximum",
    value: encumbranceMaximum,
  });

  return (
    <Stack direction="horizontal">
      <IconDisplay contents="" Icon={IconEncumbrance} tooltip="Encumbrance" />

      <LabelledProgressBar
        label={
          <Stack direction="horizontal">
            {`${encumbranceValue}/${encumbranceMaximumValue}`}

            <FloatingTextQueue delta="encumbranceMaximum" />
          </Stack>
        }
        value={(encumbranceValue / encumbranceMaximumValue) * 100}
        variant="dark"
      />
    </Stack>
  );
}
