import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Trait } from "../../../generated/schema";
import { contracts, shared } from "..";

export namespace traits {

	export function getOrCreateTrait(traitId: string): Trait {
		let trait = Trait.load(traitId)
		if (trait == null) {
			trait = new Trait(traitId)
		}
		return trait as Trait
	}

	export function getTraitById(id: BigInt, contractAddress: Address): Trait {
		let trait = getOrCreateTrait(id.toHex())

		let contract = contracts.avastarTeleporter.getAvastarTeleporterInstance(contractAddress)
		let result = contract.try_getTraitInfoById(id)

		if (result.reverted) {
			shared.logs.logInfo("getTraitById", "Result was reverted")
		} else {
			let _seriesArray = result.value.value2 // TODO parse this
			trait.generation = shared.helpers.i32Tohex(result.value.value1)
			trait.gender = shared.helpers.i32Tohex(result.value.value3)
			trait.gene = shared.helpers.i32Tohex(result.value.value4)
			trait.rarity = shared.helpers.i32Tohex(result.value.value5)
			trait.variation = BigInt.fromI32(result.value.value6)
			trait.name = result.value.value7

		}
		return trait as Trait
	}

}
