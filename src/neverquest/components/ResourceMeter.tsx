import { Atom, useAtomValue } from "jotai";

import LabelledProgressBar from "neverquest/components/LabelledProgressBar";
import { UIAttachment, UIVariant } from "neverquest/types/ui";

export default function ResourceMeter({
  attached,
  atom,
  atomMaximum,
}: {
  attached?: UIAttachment;
  atom: Atom<number>;
  atomMaximum: Atom<number>;
}) {
  const atomValue = useAtomValue(atom);
  const atomMaximumValue = useAtomValue(atomMaximum);

  return (
    <LabelledProgressBar
      attached={attached}
      label={`${atomValue}/${atomMaximumValue}`}
      value={(atomValue / atomMaximumValue) * 100}
      variant={UIVariant.Primary}
    />
  );
}
