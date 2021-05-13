import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Trait, TraitSerie } from "../../../generated/schema";
import { contracts, shared } from "..";

export namespace traits {

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

	export function mintTrait(
		traitId: string, generation: string, gene: string,
		rarity: string, variation: BigInt, name: string
	): Trait {
		let trait = getOrCreateTrait(traitId)
		trait.name = name
		trait.rarity = rarity
		trait.generation = generation
		trait.gene = gene
		trait.variation = variation
		return trait as Trait
	}

	export function getTraitById(id: BigInt, contractAddress: Address): Trait {
		let traitId = id.toHex()
		let trait = getOrCreateTrait(traitId)

		let contract = contracts.avastarTeleporter.getAvastarTeleporterInstance(contractAddress)
		let result = contract.try_getTraitInfoById(id)

		if (result.reverted) {
			shared.logs.logInfo("getTraitById", "Result was reverted")
		} else {
			trait.generation = shared.helpers.i32Tohex(result.value.value1)
			let seriesArray = result.value.value2 // TODO parse this
			trait.gender = shared.helpers.i32Tohex(result.value.value3)
			trait.gene = shared.helpers.i32Tohex(result.value.value4)
			trait.rarity = shared.helpers.i32Tohex(result.value.value5)
			trait.variation = BigInt.fromI32(result.value.value6)
			trait.name = result.value.value7

			// Beafore saving each trait an array of series must be saved first
			// is there a mor efficient way? 
			// FIXME
			for (let index = 0; index < seriesArray.length; index++) {
				let serieId = shared.helpers.i32Tohex(seriesArray[index]);
				let traitSerie = getOrCreateTraitSerie(traitId, serieId)
				traitSerie.trait = traitId
				traitSerie.series = serieId
				traitSerie.save()
			}

		}
		return trait as Trait
	}

}
