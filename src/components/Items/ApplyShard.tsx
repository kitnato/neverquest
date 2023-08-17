import { Button } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { useApplyShard } from "@neverquest/hooks/actions/useApplyShard";
import { canApplyShard } from "@neverquest/state/inventory";
import type { ShardItem } from "@neverquest/types";

export function ApplyShard({ shard }: { shard: ShardItem }) {
  const canApplyShardValue = useRecoilValue(canApplyShard);

  const applyShard = useApplyShard();

  return (
    <Button disabled={!canApplyShardValue} onClick={() => applyShard(shard)} variant="outline-dark">
      Apply
    </Button>
  );
}
