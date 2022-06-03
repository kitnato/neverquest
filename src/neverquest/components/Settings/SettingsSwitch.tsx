import { PrimitiveAtom, useAtom } from "jotai";
import Form from "react-bootstrap/Form";

export default function SettingsSwitch({
  atom,
  isDisabled = false,
  label,
}: {
  atom: PrimitiveAtom<boolean>;
  isDisabled?: boolean;
  label: string;
}) {
  const [toggledValue, setToggle] = useAtom(atom);

  return (
    <Form.Switch
      defaultChecked={toggledValue}
      disabled={isDisabled}
      label={label}
      onChange={({ target: { checked } }: { target: { checked: boolean } }) => setToggle(checked)}
    />
  );
}
