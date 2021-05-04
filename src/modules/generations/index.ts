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


		export let GENERATION_IDS = new Map<string, string>()
		GENERATION_IDS.set(GENERATION_ONE, "0xg1")
		GENERATION_IDS.set(GENERATION_TWO, "0xg2")
		GENERATION_IDS.set(GENERATION_THREE, "0xg3")
		GENERATION_IDS.set(GENERATION_FOUR, "0xg4")
		GENERATION_IDS.set(GENERATION_FIVE, "0xg5")
	}

	export namespace helpers {
		export function getGenerationId(name: string): string | null {
			let generationId: string | null = constants.GENERATION_IDS.has(name) ?
				constants.GENERATION_IDS.get(name) : null
			if (generationId == null) {
				shared.logs.logInfo(
					"getGenerationId",
					"Coulnd't find id for name: " + name
				)
				// shared.logs.logCritical(
				// 	"getGenerationId",
				// 	"Coulnd't find id for name: " + name
				// )
			}
			return name
		}

		export function getOrCreateGeneration(generationId: string, name: string): Generation {
			let generation = Generation.load(generationId)
			if (generation == null) {
				generation = new Generation(generationId)
				generation.name = name
				generation.minted = integer.ZERO
			}
			return generation as Generation

		}

	}

	export function increaseGenerationMinted(generationId: string, name: string): Generation {
		let generation = helpers.getOrCreateGeneration(generationId, name)

		generation.minted = generation.minted.plus(integer.ONE)
		return generation as Generation
	}
}