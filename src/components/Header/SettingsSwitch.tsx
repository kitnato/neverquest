import { RecoilState, useRecoilState } from "recoil";
import Form from "react-bootstrap/Form";

export default function SettingsSwitch({
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
      onChange={({ target: { checked } }: { target: { checked: boolean } }) => setToggle(checked)}
    />
  );
}
