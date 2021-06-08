import { TypedMap } from '@graphprotocol/graph-ts'
import { integer } from '@protofire/subgraph-toolkit'
import { Generation } from "../../../generated/schema"
import { shared } from "../shared"
export namespace generations {
	export namespace constants {
		export function getNames(): TypedMap<string, string> {
			let GENERATION_ONE = "0x0"
			let GENERATION_TWO = "0x1"
			let GENERATION_THREE = "0x2"
			let GENERATION_FOUR = "0x3"
			let GENERATION_FIVE = "0x4"
			let GENERATION_NAMES = new TypedMap<string, string>()
			GENERATION_NAMES.set(GENERATION_ONE, "ONE")
			GENERATION_NAMES.set(GENERATION_TWO, "TWO")
			GENERATION_NAMES.set(GENERATION_THREE, "THREE")
			GENERATION_NAMES.set(GENERATION_FOUR, "FOUR")
			GENERATION_NAMES.set(GENERATION_FIVE, "FIVE")
			return GENERATION_NAMES
		}
	}

	export namespace helpers {
		export function getGenerationName(id: string): string | null {
			return shared.helpers.getPropById(id, constants.getNames())
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

	export function setAtribution(generationId: string, atributionId: string): Generation {
		let generation = helpers.getOrCreateGeneration(generationId)
		generation.attribution = atributionId
		return generation as Generation
	}
}