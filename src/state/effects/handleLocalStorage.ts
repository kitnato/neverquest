import ls from "localstorage-slim";
import { AtomEffect } from "recoil";

import { KEY_SESSION, KEY_SETTINGS } from "@neverquest/constants";
import { StorageKey } from "@neverquest/types";

export function handleLocalStorage<ValueType>({
  isSetting,
  key,
  parameter,
}: {
  isSetting?: boolean;
  key: StorageKey;
  parameter?: number;
}): AtomEffect<ValueType> {
  return ({ onSet, setSelf }) => {
    type Store = Record<string, ValueType>;

    const storeKey = isSetting ? KEY_SETTINGS : KEY_SESSION;
    const store = ls.get<Store>(storeKey);
    const valueKey = `${key}${parameter ? `-${parameter}` : ""}`;

    if (store !== null) {
      const storedValue = store[valueKey];

      if (storedValue !== undefined) {
        setSelf(storedValue);
      }
    }

    onSet((newValue, _, isReset) => {
      const newStore = ls.get<Store>(storeKey) || {};

      if (isReset) {
        delete newStore[valueKey];
      } else {
        newStore[valueKey] = newValue;
      }

      ls.set(storeKey, newStore);
    });
  };
}
