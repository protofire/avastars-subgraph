import { integer } from '@protofire/subgraph-toolkit'
import { Generation } from "../../../generated/schema"
import { shared } from "../shared"
export namespace generations {
	export namespace constants {
		export let GENERATION_ONE = "0x0"
		export let GENERATION_TWO = "0x1"
		export let GENERATION_THREE = "0x2"
		export let GENERATION_FOUR = "0x3"
		export let GENERATION_FIVE = "0x4"


		export let GENERATION_NAMES = new Map<string, string>()
		GENERATION_NAMES.set(GENERATION_ONE, "ONE")
		GENERATION_NAMES.set(GENERATION_TWO, "TWO")
		GENERATION_NAMES.set(GENERATION_THREE, "THREE")
		GENERATION_NAMES.set(GENERATION_FOUR, "FOUR")
		GENERATION_NAMES.set(GENERATION_FIVE, "FIVE")
	}

	export namespace helpers {
		export function getGenerationName(id: string): string | null {
			let generationName: string | null = constants.GENERATION_NAMES.has(id) ?
				constants.GENERATION_NAMES.get(id) : null
			if (generationName == null) {
				shared.logs.logInfo(
					"getGenerationId",
					"Coulnd't find id for id: " + id
				)
			}
			return generationName
		}

		export function getOrCreateGeneration(generationId: string): Generation {
			let generation = Generation.load(generationId)
			if (generation == null) {
				generation = new Generation(generationId)
				generation.name = getGenerationName(generationId)
				generation.minted = integer.ZERO
			}
			return generation as Generation
		}

	}

	export function increaseGenerationMinted(generationId: string): Generation {
		let generation = helpers.getOrCreateGeneration(generationId)

		generation.minted = generation.minted.plus(integer.ONE)
		return generation as Generation
	}
}