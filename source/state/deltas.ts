import { atomFamily } from "recoil"

import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { withStateKey } from "@neverquest/utilities/helpers"

import type { DeltaDisplay } from "@neverquest/types/ui"
import type { Delta } from "@neverquest/types/unions"

// ATOMS

export const deltas = withStateKey("deltas", key =>
	atomFamily<{ display: DeltaDisplay[], ID: string }[], Delta>({
		default: [],
		effects: delta => [handleStorage({ key, parameter: delta })],
		key,
	}),
)
