import { persistentSignalFamily } from "@neverquest/utilities/persistentSignal"

import type { DeltaDisplay } from "@neverquest/types/general"
import type { Delta } from "@neverquest/types/unions"

export const deltas = persistentSignalFamily<Delta, { display: DeltaDisplay[], ID: string }[]>({
	key: "deltas",
	value: [],
})
