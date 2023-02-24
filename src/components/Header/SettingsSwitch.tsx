import { Form } from "react-bootstrap";
import { RecoilState, useRecoilState } from "recoil";

export function SettingsSwitch({
  atom,
  isDisabled = false,
  label,
}: {
  atom: RecoilState<boolean>;
  isDisabled?: boolean;
  label: string;
}) {
  const [toggledValue, setToggle] = useRecoilState(atom);

  return (
    <Form.Switch
      defaultChecked={toggledValue}
      disabled={isDisabled}
      label={label}
      onChange={({ target: { checked } }) => setToggle(checked)}
    />
  );
}
