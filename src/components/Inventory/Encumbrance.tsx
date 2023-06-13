import { useRecoilValue } from "recoil";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { ReactComponent as IconEncumbrance } from "@neverquest/icons/encumbrance.svg";
import { encumbrance, encumbranceMaximum } from "@neverquest/state/inventory";

export function Encumbrance() {
  const encumbranceValue = useRecoilValue(encumbrance);
  const encumbranceMaximumValue = useRecoilValue(encumbranceMaximum);

  return (
    <IconDisplay
      contents={
        <LabelledProgressBar
          label={`${encumbranceValue}/${encumbranceMaximumValue}`}
          value={(encumbranceValue / encumbranceMaximumValue) * 100}
          variant="dark"
        />
      }
      Icon={IconEncumbrance}
      tooltip="Encumbrance"
    />
  );
}
