import { TypedMap } from '@graphprotocol/graph-ts'
import { integer } from '@protofire/subgraph-toolkit'
import { Rarity } from "../../../generated/schema"
import { shared } from "../shared"
export namespace raritys {
	export namespace constants {
		export function getNames(): TypedMap<string, string> {
			let RARITY_COMMON = "0x0"
			let RARITY_UNCOMMON = "0x1"
			let RARITY_RARE = "0x2"
			let RARITY_EPIC = "0x3"
			let RARITY_LEGENDARY = "0x4"
			let RARITY_NAMES = new TypedMap<string, string>()
			RARITY_NAMES.set(RARITY_COMMON, "COMMON")
			RARITY_NAMES.set(RARITY_UNCOMMON, "UNCOMMON")
			RARITY_NAMES.set(RARITY_RARE, "RARE")
			RARITY_NAMES.set(RARITY_EPIC, "EPIC")
			RARITY_NAMES.set(RARITY_LEGENDARY, "LEGENDARY")
			return RARITY_NAMES
		}

	}

	export namespace helpers {
		export function getRarityNameById(id: string): string | null {
			return shared.helpers.getPropById(id, constants.getNames())
		}

		export function getOrCreateRarity(rarityId: string): Rarity {
			let rarity = Rarity.load(rarityId)
			if (rarity == null) {
				rarity = new Rarity(rarityId)
				rarity.name = getRarityNameById(rarityId)
				rarity.minted = integer.ZERO
			}
			return rarity as Rarity

		}

	}

	export function increaseRarityMinted(rarityId: string): Rarity {
		let rarity = helpers.getOrCreateRarity(rarityId)
		rarity.minted = rarity.minted.plus(integer.ONE)
		return rarity as Rarity
	}
}