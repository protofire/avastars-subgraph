import { Address, BigInt, TypedMap } from "@graphprotocol/graph-ts";
import { Trait, TraitSerie } from "../../../generated/schema";
import { bitmasking, contracts, shared } from "..";
import { AvastarTeleporter } from "../../../generated/AvastarTeleporter/AvastarTeleporter";
import { integer } from "@protofire/subgraph-toolkit";

export namespace traits {
	export namespace constants {
		export let GENE_HASH_KEY = "GENE"
		export let VARIATION_HASH_KEY = "VARIATION"
	}
	export namespace helpers {
		export function getOrCreateTraitSerie(traitId: string, seriesId: string): TraitSerie {
			let traitSerieId = traitId + '@' + seriesId
			let traitSerie = TraitSerie.load(traitSerieId)
			if (traitSerie == null) {
				traitSerie = new TraitSerie(traitSerieId)
			}
			return traitSerie as TraitSerie
		}

		export function getOrCreateTrait(traitId: string): Trait {
			let trait = Trait.load(traitId)
			if (trait == null) {
				trait = new Trait(traitId)
			}
			return trait as Trait
		}

		export function getTraitIdsByHash(hash: BigInt, generation: i32, contract: AvastarTeleporter): Array<BigInt> {
			let ids: Array<BigInt> = new Array()
			// let base = bitmasking.constants.base.toI32()
			for (let gene = 0; gene < 256; gene++) {
				let variation = parseI32(bitmasking.helpers.getVariationByGene(gene, hash).toString())
				if (variation > 0) {
					let result = contract.try_getTraitIdByGenerationGeneAndVariation(
						generation,
						gene,
						variation
					)

					// set id as zero by default
					let id = integer.ZERO

					// if result's not reverted, set id to value and push
					if (result.reverted) {
						shared.logs.warning(
							"try_getTraitIdByGenerationGeneAndVariation",
							"result was reverted"
						)
						// shared.logs.critical()
					} else {
						id = result.value
					}

					ids.push(id)
				}

			}
			return ids
		}
	}


	export function mintTrait(
		traitId: string, generation: string, gene: string,
		rarity: string, variation: BigInt, name: string
	): Trait {
		let trait = helpers.getOrCreateTrait(traitId)
		trait.name = name
		trait.rarity = rarity
		trait.generation = generation
		trait.gene = gene
		trait.variation = variation
		return trait as Trait
	}


	// this whole function is too weird
	// doesn't seems ok to iterate 32 possible variations, then create 32 traits entities
	// and create an x amount of series for each trait entitie
	// TODO test this
	export function getAndSaveTraits(hash: BigInt, generation: i32, contractAddress: Address): void {
		let contract = contracts.avastarTeleporter.getAvastarTeleporterInstance(contractAddress)

		let traitIds = helpers.getTraitIdsByHash(hash, generation, contract)

		for (let i = 0; i < traitIds.length; i++) {
			let id = traitIds[i]
			let strId = id.toHex()

			let trait = helpers.getOrCreateTrait(strId)
			// this might not be necessary
			// should be enough with
			// trait.avastar = tokenId and chage the relationship 
			// FIXME
			let result = contract.try_getTraitInfoById(id)

			if (result.reverted) {
				shared.logs.logInfo("getAndSaveTraits", "Result was reverted")
			} else {
				trait.generation = shared.helpers.i32Tohex(result.value.value1)
				trait.gender = shared.helpers.i32Tohex(result.value.value3)
				trait.gene = shared.helpers.i32Tohex(result.value.value4)
				trait.rarity = shared.helpers.i32Tohex(result.value.value5)
				trait.variation = BigInt.fromI32(result.value.value6)
				trait.name = result.value.value7

				let seriesArray = result.value.value2
				// Beafore saving each trait an array of series must be saved first
				// is there a more efficient way? 
				// FIXME
				for (let index = 0; index < seriesArray.length; index++) {
					let serieId = shared.helpers.i32Tohex(seriesArray[index]);
					let traitSerie = helpers.getOrCreateTraitSerie(strId, serieId)
					traitSerie.trait = strId
					traitSerie.serie = serieId
					traitSerie.save()
				}

			}
			trait.save()
		}

	}

}
