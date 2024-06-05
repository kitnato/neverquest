import {
	MILLISECONDS_IN_HOUR,
	MILLISECONDS_IN_MINUTE,
	MILLISECONDS_IN_SECOND,
	NUMBER_FORMAT,
	ORDINALS,
	PERCENTAGE,
} from "@neverquest/data/general"

import type { NumberFormat } from "@neverquest/types/unions"

export function capitalizeAll(string: string) {
	// ^\w{1} matches the first letter of the word, or (|) \s+ matches any amount of whitespace between the words.
	return string.replaceAll(/(^\w)|(\s+\w)/g, letter => letter.toUpperCase())
}

export function formatCardinal(ordinal: number) {
	const formattedOrdinal = formatNumber({ value: ordinal })

	switch (ORDINALS.select(ordinal)) {
		case "one": {
			return `${formattedOrdinal}st`
		}

		case "two": {
			return `${formattedOrdinal}nd`
		}

		case "few": {
			return `${formattedOrdinal}rd`
		}

		default: {
			return `${formattedOrdinal}th`
		}
	}
}

export function formatEnumeration(list: string[]) {
	const formatter = new Intl.ListFormat("en", { style: "short" })

	return formatter.format(list).replace(", &", " &")
}

// Correctly does the rounding as opposed to .toFixed().
function formatFloat({ decimals = 2, value }: { decimals?: number, value: number }) {
	const multiplier = 10 ** decimals

	return (
		Math.round(Number.parseFloat((value * multiplier).toFixed(12))) / multiplier
	).toLocaleString(undefined, {
		maximumFractionDigits: decimals,
		minimumFractionDigits: decimals,
	})
}

export function formatKebabCase(words: string) {
	return words
		.toLowerCase()
		.replaceAll(/^\s+|\s+$/g, "")
		.replaceAll(/[^\d a-z-]/g, "")
		.replaceAll(/\s+/g, "-")
		.replaceAll(/-+/g, "-")
}

export function formatNumber({
	format = "integer",
	value,
}: {
	format?: NumberFormat
	value: number
}) {
	switch (format) {
		// https://stackoverflow.com/a/9462382
		case "abbreviated": {
			const { formatter, mapping } = NUMBER_FORMAT
			const number = mapping.findLast(item => value >= item.threshold)

			return number === undefined
				? "0"
				: formatFloat({ decimals: 1, value: value / number.threshold })
					.replace(formatter, "")
					.concat(number.symbol)
		}

		case "float": {
			return formatFloat({ value })
		}

		case "percentage": {
			const percentage = formatFloat({ value: value * PERCENTAGE })
			const parts = percentage.split(".")

			return `${parts[1] === undefined
				? percentage
				: parts[1] === "00"
					? parts[0] ?? ""
					: percentage}%`
		}

		case "integer": {
			return Math.round(value).toLocaleString()
		}

		case "multiplier": {
			return `×${formatFloat({ value: value + 1 })}`
		}

		case "time": {
			const absoluteValue = Math.abs(value)
			const hours = Math.floor(absoluteValue / MILLISECONDS_IN_HOUR)
			const minutes = Math.floor((absoluteValue % MILLISECONDS_IN_HOUR) / MILLISECONDS_IN_MINUTE)
			const seconds = Math.floor((absoluteValue % MILLISECONDS_IN_MINUTE) / MILLISECONDS_IN_SECOND)

			return `${value < 0 ? "-" : ""}${hours > 0 ? `${hours}h` : ""}${hours > 0 || minutes > 0 ? `${minutes}m` : ""}${minutes > 0 || seconds >= 10 ? `${seconds}s` : ""}${hours === 0 && minutes === 0 && seconds < 10
				? `${formatFloat({ value: absoluteValue / MILLISECONDS_IN_SECOND })}s`
				: ""}`
		}
	}
}
