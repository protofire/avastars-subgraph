import { TypedMap } from '@graphprotocol/graph-ts'
import { integer } from '@protofire/subgraph-toolkit'
import { Wave } from "../../../generated/schema"
import { shared } from "../shared"

export namespace waves {
	export namespace constants {
		export let WAVE_PRIME = "0x0"
		export let WAVE_PREPLICANT = "0x1"

		export function getNames(): TypedMap<string, string> {
			let WAVE_PRIME = "0x0"
			let WAVE_PREPLICANT = "0x1"
			let WAVE_NAMES = new TypedMap<string, string>()
			WAVE_NAMES.set(WAVE_PRIME, "PRIME")
			WAVE_NAMES.set(WAVE_PREPLICANT, "REPLICANT")
			return WAVE_NAMES
		}
	}

	export namespace helpers {
		export function getWaveNameById(id: string): string | null {
			return shared.helpers.getPropById(id, constants.getNames())

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