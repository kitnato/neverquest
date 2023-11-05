import { Form } from "react-bootstrap";
import { type RecoilState, useRecoilState } from "recoil";

import { formatSlug } from "@neverquest/utilities/formatters";

export function SettingsSwitch({
  isDisabled = false,
  label,
  state,
}: {
  isDisabled?: boolean;
  label: string;
  state: RecoilState<boolean>;
}) {
  const [toggledValue, setToggle] = useRecoilState(state);

  return (
    <Form.Switch
      defaultChecked={toggledValue}
      disabled={isDisabled}
      id={formatSlug(label)}
      label={label}
      onChange={({ target: { checked } }) => setToggle(checked)}
    />
  );
}
