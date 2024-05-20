export const AILMENT_PENALTY = {
	frozen: 0.4,
	shocked: 0.1,
	staggered: 0.15,
	stunned: 0.5,
}

export const BLEED = {
	base: { duration: 4000, ticks: 20 },
	minimum: 1,
	shredder: { duration: 100, ticks: 1 },
}

export const DEFLECTION_MAXIMUM = 0.95

export const LOOTING_RATE = {
	"base": 2400,
	"ender hook": 600,
}

export const PARRY = {
	avoidance: 0.1,
	avoidanceAttenuation: 0.267, // maximum of 30% avoidance and 90% reflection
	damage: 0.2,
}

export const RECOVERY_RATE = 1300
