import ls from "localstorage-slim";
import type { AtomEffect } from "recoil";

import type { StateKey } from "@neverquest/types/state-key";
import { KEY_SESSION, KEY_SETTINGS } from "@neverquest/utilities/constants";

export function handleLocalStorage<ValueType>({
  isSetting,
  key,
  parameter,
}: {
  isSetting?: boolean;
  key: StateKey;
  parameter?: number;
}): AtomEffect<ValueType> {
  return ({ onSet, setSelf }) => {
    type Store = Record<string, ValueType>;

    const storeKey = isSetting ? KEY_SETTINGS : KEY_SESSION;
    const store = ls.get<Store>(storeKey);
    const valueKey = `${key}${parameter === undefined ? "" : `-${parameter}`}`;

    if (store !== null) {
      const storedValue = store[valueKey];

      if (storedValue !== undefined) {
        setSelf(storedValue);
      }
    }

    onSet((newValue, _, isReset) => {
      const store = ls.get<Store>(storeKey);

      if (store !== null) {
        if (isReset) {
          const { [valueKey]: _, ...newStore } = store;

          ls.set(storeKey, newStore);
        } else {
          ls.set(storeKey, { ...store, [valueKey]: newValue });
        }
      }
    });
  };
}

export function withStateKey<State>(key: StateKey, assign: (key: StateKey) => State) {
  return assign(key);
}
