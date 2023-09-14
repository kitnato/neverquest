import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDeflection } from "@neverquest/icons/execution.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { execution } from "@neverquest/state/statistics";
import { LABEL_EMPTY } from "@neverquest/utilities/constants";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function Execution() {
  const executionValue = useRecoilValue(execution);
  const isShowingValue = useRecoilValue(isShowing("execution"));
  const skillSiegecraft = useRecoilValue(skills("siegecraft"));

  useDeltaText({
    atomDelta: deltas("execution"),
    atomValue: execution,
    stop: ({ previous }) => previous === null || !skillSiegecraft,
  });

  if (!isShowingValue) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack direction="horizontal">
          <span>
            {skillSiegecraft
              ? executionValue === 0
                ? LABEL_EMPTY
                : formatPercentage(executionValue, 0)
              : LABEL_EMPTY}
          </span>

          <FloatingText deltaType="execution" />
        </Stack>
      }
      Icon={IconDeflection}
      isAnimated
      tooltip="Execution threshold"
    />
  );
}
