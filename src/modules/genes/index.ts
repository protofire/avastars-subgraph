import { TypedMap } from '@graphprotocol/graph-ts'
import { integer } from '@protofire/subgraph-toolkit'
import { Gene } from "../../../generated/schema"
import { shared } from "../shared"

export namespace genes {

	export namespace constants {
		export function getNames(): TypedMap<string, string> {
			let GENE_SKIN_TONE = "0x0"
			let GENE_HAIR_COLOR = "0x1"
			let GENE_EYE_COLOR = "0x2"
			let GENE_BG_COLOR = "0x3"
			let GENE_BACKDROP = "0x4"
			let GENE_EARS = "0x5"
			let GENE_FACE = "0x6"
			let GENE_NOSE = "0x7"
			let GENE_MOUTH = "0x8"
			let GENE_FACIAL_FEATURE = "0x9"
			let GENE_EYES = "0xa"
			let GENE_HAIR_STYLE = "0xb"
			let GENE_NAMES = new TypedMap<string, string>()
			GENE_NAMES.set(GENE_SKIN_TONE, "SKIN_TONE")
			GENE_NAMES.set(GENE_HAIR_COLOR, "HAIR_COLOR")
			GENE_NAMES.set(GENE_EYE_COLOR, "EYE_COLOR")
			GENE_NAMES.set(GENE_BG_COLOR, "BG_COLOR")
			GENE_NAMES.set(GENE_BACKDROP, "BACKDROP")
			GENE_NAMES.set(GENE_EARS, "EARS")
			GENE_NAMES.set(GENE_FACE, "FACE")
			GENE_NAMES.set(GENE_NOSE, "NOSE")
			GENE_NAMES.set(GENE_MOUTH, "MOUTH")
			GENE_NAMES.set(GENE_FACIAL_FEATURE, "FACIAL_FEATURE")
			GENE_NAMES.set(GENE_EYES, "EYES")
			GENE_NAMES.set(GENE_HAIR_STYLE, "HAIR_STYLE")
			return GENE_NAMES
		}

	}

	export namespace helpers {
		export function getGeneNameById(id: string): string | null {
			return shared.helpers.getPropById(id, constants.getNames())
		}

		export function getOrCreateGene(geneId: string): Gene {
			let gene = Gene.load(geneId)
			if (gene == null) {
				gene = new Gene(geneId)
				gene.name = getGeneNameById(geneId)
				gene.minted = integer.ZERO
			}
			return gene as Gene

		}

	}

	export function increaseGeneMinted(geneId: string): Gene {
		let gene = helpers.getOrCreateGene(geneId)
		gene.minted = gene.minted.plus(integer.ONE)
		return gene as Gene
	}
}