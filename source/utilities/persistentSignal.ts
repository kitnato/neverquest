import { type ReadonlySignal, computed, signal } from "@preact/signals"
import ls from "localstorage-slim"

import { KEY_SESSION } from "@neverquest/data/general"

type PersistentSignal<ValueType> = {
	key: string
	value: ValueType
}

type PersistentSignalFamilyInitializer<ParameterType, ValueType> = ((parameter: ParameterType) => ValueType)

export function computedFamily<ParameterType extends number | string, ValueType>(callback: (parameter: ParameterType) => () => ValueType) {
	const family: Partial<Record<ParameterType, ReadonlySignal<ValueType>>> = {}

	return (parameter: ParameterType) => {
		const registeredComputed = family[parameter]
		const persistentComputed = registeredComputed ?? computed(callback(parameter))

		if (registeredComputed === undefined) {
			family[parameter] = persistentComputed
		}

		return persistentComputed
	}
}

function isPersistentSignalFamilyInitializer<ParameterType, ValueType>(thing: unknown): thing is PersistentSignalFamilyInitializer<ParameterType, ValueType> {
	return typeof thing === "function"
}

export function persistentSignal<ValueType>({ key, parameter, value }: PersistentSignal<ValueType> & { parameter?: number | string }) {
	type Store = Record<string, ValueType>
	const originalValue = { ...value }
	const store = ls.get<Store>(KEY_SESSION, { decrypt: true })
	const storeKey = `${key}${parameter === undefined ? "" : `-${parameter}`}`

	const _signal = signal<ValueType>(store?.[storeKey] ?? value)

	return {
		get: () => _signal.value,
		reset: () => {
			_signal.value = originalValue
			updateStore({ key: storeKey, value: originalValue })
		}, set: (newValue: ValueType) => {
			_signal.value = newValue
			updateStore({ key: storeKey, value: newValue })
		},
	}
}

export function persistentSignalFamily<ParameterType extends number | string, ValueType>({ key, value }: {
	key: string
	value: PersistentSignalFamilyInitializer<ParameterType, ValueType> | ValueType
}) {
	const family: Partial<Record<ParameterType, ReturnType<typeof persistentSignal<ValueType>>>> = {}

	return (parameter: ParameterType) => {
		const registeredPersistentSignal = family[parameter]
		const persistentSignalInstance = registeredPersistentSignal ?? persistentSignal<ValueType>({
			key,
			parameter,
			value: isPersistentSignalFamilyInitializer<ParameterType, ValueType>(value) ? value(parameter) : value,
		})

		if (registeredPersistentSignal === undefined) {
			family[parameter] = persistentSignalInstance
		}

		return persistentSignalInstance
	}
}

function updateStore<ValueType>({ key, value }: PersistentSignal<ValueType>) {
	type Store = Record<string, ValueType>
	const store = ls.get<Store>(KEY_SESSION, { decrypt: true }) ?? {}

	ls.set(KEY_SESSION, { ...store, [key]: value }, { encrypt: true })
}
