
import { integer } from '@protofire/subgraph-toolkit'
import { Wave } from "../../../generated/schema"
import { shared } from "../shared"

export namespace waves {
	export namespace constants {
		export let WAVE_PRIME = "0x0"
		export let WAVE_PREPLICANT = "0x1"

		export let WAVE_NAMES = new Map<string, string>()
		WAVE_NAMES.set(WAVE_PRIME, "PRIME")
		WAVE_NAMES.set(WAVE_PREPLICANT, "REPLICANT")
	}

	export namespace helpers {
		export function getWaveNameById(id: string): string | null {
			let name: string | null = constants.WAVE_NAMES.has(id) ?
				constants.WAVE_NAMES.get(id) : null
			if (name == null) {
				shared.logs.logInfo(
					"getWaveNameById",
					"Coulnd't find name for id: " + id
				)
			}
			return name
		}

		export function getOrCreateWave(waveId: string): Wave {
			let wave = Wave.load(waveId)
			if (wave == null) {
				wave = new Wave(waveId)
				wave.name = getWaveNameById(waveId)
				wave.minted = integer.ZERO
			}
			return wave as Wave

		}

	}

	export function increaseWaveMinted(waveId: string): Wave {
		let wave = helpers.getOrCreateWave(waveId)
		wave.minted = wave.minted.plus(integer.ONE)
		return wave as Wave
	}
}