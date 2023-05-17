import ls from "localstorage-slim";
import type { AtomEffect } from "recoil";

import { KEY_SESSION, KEY_SETTINGS } from "@neverquest/data/constants";
import type { StateKey } from "@neverquest/types/state-key";

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
      const newStore = ls.get<Store>(storeKey) ?? {};

      if (isReset) {
        Reflect.deleteProperty(newStore, valueKey);
      } else {
        newStore[valueKey] = newValue;
      }

      ls.set(storeKey, newStore);
    });
  };
}

export function withStateKey<State>(key: StateKey, assign: (key: StateKey) => State) {
  return assign(key);
}
