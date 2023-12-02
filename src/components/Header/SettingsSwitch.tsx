import { Form } from "react-bootstrap";
import { type RecoilState, useRecoilState } from "recoil";

import { formatKebabCase } from "@neverquest/utilities/formatters";

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
      id={formatKebabCase(label)}
      label={label}
      onChange={({ target: { checked } }) => {
        setToggle(checked);
      }}
    />
  );
}
