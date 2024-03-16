import ls from "localstorage-slim"
import type { AtomEffect } from "recoil"

import { KEY_SESSION } from "@neverquest/data/general"
import type { StateKey } from "@neverquest/types/unions"

export function handleStorage<ValueType>({
  key,
  parameter,
}: {
  key: StateKey;
  parameter?: number | string;
}): AtomEffect<ValueType> {
  return ({ onSet, setSelf }) => {
    type Store = Record<string, ValueType>

    const store = ls.get<Store>(KEY_SESSION, { decrypt: true })
    const valueKey = `${key}${parameter === undefined ? `` : `-${parameter}`}`

    if (store !== null) {
      const storedValue = store[valueKey]

      if (storedValue !== undefined) {
        setSelf(storedValue)
      }
    }

    onSet((newValue, _, isReset) => {
      const store = ls.get<Store>(KEY_SESSION, { decrypt: true }) ?? {}

      if (isReset) {
        const { [valueKey]: _, ...newStore } = store

        ls.set(KEY_SESSION, newStore, { encrypt: true })
      } else {
        ls.set(KEY_SESSION, { ...store, [valueKey]: newValue }, { encrypt: true })
      }
    })
  }
}
