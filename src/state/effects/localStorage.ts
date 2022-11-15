import ls from "localstorage-slim";
import { AtomEffect } from "recoil";

import { KEY_SESSION, KEY_SETTINGS } from "@neverquest/constants";

export default function <ValueType>(key: string, isSettings?: boolean): AtomEffect<ValueType> {
  return ({ onSet, setSelf }) => {
    type Store = Partial<Record<string, ValueType>>;

    const storeKey = isSettings ? KEY_SETTINGS : KEY_SESSION;
    const store = ls.get<Store>(storeKey);

    if (store !== null) {
      const storedValue = store[key];

      if (storedValue !== undefined) {
        setSelf(storedValue);
      }
    }

    onSet((newValue, _, isReset) => {
      const newStore = ls.get<Store>(storeKey) || {};

      if (isReset) {
        delete newStore[key];
      } else {
        newStore[key] = newValue;
      }

      ls.set(storeKey, newStore);
    });
  };
}
