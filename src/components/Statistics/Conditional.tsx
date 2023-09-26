import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { BleedRating } from "@neverquest/components/Statistics/BleedRating";
import { Block } from "@neverquest/components/Statistics/Block";
import { CombatRange } from "@neverquest/components/Statistics/CombatRange";
import { Deflection } from "@neverquest/components/Statistics/Deflection";
import { Execution } from "@neverquest/components/Statistics/Execution";
import { ParryRating } from "@neverquest/components/Statistics/ParryRating";
import { StaggerRating } from "@neverquest/components/Statistics/StaggerRating";
import { StunRating } from "@neverquest/components/Statistics/StunRating";
import { isShowing } from "@neverquest/state/isShowing";

export function Conditional() {
  const isShowingConditional = useRecoilValue(isShowing("conditional"));

  if (!isShowingConditional) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={5}>
      <Block />

      <StaggerRating />

      <Deflection />

      <Execution />

      <CombatRange />

      <StunRating />

      <BleedRating />

      <ParryRating />
    </Stack>
  );
}
