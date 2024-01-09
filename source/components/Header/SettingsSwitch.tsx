import { Form } from "react-bootstrap";
import { useRecoilState } from "recoil";

import { isSettingActive } from "@neverquest/state/settings";
import type { Setting } from "@neverquest/types/unions";
import { formatKebabCase } from "@neverquest/utilities/formatters";

export function SettingsSwitch({
  isDisabled = false,
  label,
  setting,
}: {
  isDisabled?: boolean;
  label: string;
  setting: Setting;
}) {
  const [isSettingActiveValue, setIsSettingActive] = useRecoilState(isSettingActive(setting));

  return (
    <Form.Switch
      defaultChecked={isSettingActiveValue}
      disabled={isDisabled}
      id={formatKebabCase(label)}
      label={label}
      onChange={({ target: { checked } }) => {
        setIsSettingActive(checked);
      }}
    />
  );
}
