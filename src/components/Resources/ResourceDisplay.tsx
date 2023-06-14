import { IconDisplay } from "@neverquest/components/IconDisplay";
import { RESOURCES } from "@neverquest/data/resources";
import type { Resource } from "@neverquest/types/unions";
import { capitalizeAll } from "@neverquest/utilities/formatters";

export function ResourceDisplay({
  tooltip,
  type,
  value,
}: {
  tooltip?: string;
  type: Resource;
  value: number;
}) {
  const { Icon } = RESOURCES[type];

  return <IconDisplay contents={value} Icon={Icon} tooltip={tooltip ?? capitalizeAll(type)} />;
}
