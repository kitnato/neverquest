import type { Dispatch, SetStateAction } from "react";
import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ConfirmationDialog } from "@neverquest/components/ConfirmationDialog";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ItemsInherited } from "@neverquest/components/Retirement/ItemsInherited";
import { TraitSelection } from "@neverquest/components/Retirement/TraitSelection";
import { useRetire } from "@neverquest/hooks/actions/useRetire";
import { ReactComponent as IconProgress } from "@neverquest/icons/progress.svg";
import { ReactComponent as IconRetire } from "@neverquest/icons/retire.svg";
import { stage } from "@neverquest/state/encounter";
import { formatValue } from "@neverquest/utilities/formatters";
import { getProgressReduction } from "@neverquest/utilities/getters";

export function Retirement({
  showing: [isShowing, setIsShowing],
}: {
  showing: [boolean, Dispatch<SetStateAction<boolean>>];
}) {
  const stageValue = useRecoilValue(stage);

  const retire = useRetire();

  const handleRetirement = () => {
    retire();
  };

  return (
    <ConfirmationDialog
      confirmationLabel="Retire"
      contents={
        <Stack gap={5}>
          <Stack gap={3}>
            Retiring gives up on all essence and gear and starts a new quest with quicker progress
            alongside a powerful trait.
            <IconDisplay
              contents={`-${formatValue({
                format: "percentage",
                value: getProgressReduction(stageValue),
              })}`}
              Icon={IconProgress}
              tooltip="Progress discount"
            />
          </Stack>

          <ItemsInherited />

          <TraitSelection />
        </Stack>
      }
      Icon={IconRetire}
      onConfirm={handleRetirement}
      setHidden={() => setIsShowing(false)}
      show={isShowing}
      size="lg"
      title="Retirement"
    />
  );
}
