import { integer } from '@protofire/subgraph-toolkit'
import { Rarity } from "../../../generated/schema"
import { shared } from "../shared"
export namespace raritys {
	export namespace constants {
		export let RARITY_COMMON = "0x0"
		export let RARITY_UNCOMMON = "0x1"
		export let RARITY_RARE = "0x2"
		export let RARITY_EPIC = "0x3"
		export let RARITY_LEGENDARY = "0x4"

		export let RARITY_NAMES = new Map<string, string>()
		RARITY_NAMES.set(RARITY_COMMON, "COMMON")
		RARITY_NAMES.set(RARITY_UNCOMMON, "UNCOMMON")
		RARITY_NAMES.set(RARITY_RARE, "RARE")
		RARITY_NAMES.set(RARITY_EPIC, "EPIC")
		RARITY_NAMES.set(RARITY_LEGENDARY, "LEGENDARY")
	}

	export namespace helpers {
		export function getRarityNameById(id: string): string | null {
			let name: string | null = constants.RARITY_NAMES.has(id) ?
				constants.RARITY_NAMES.get(id) : null
			if (name == null) {
				shared.logs.logInfo(
					"getRarityByName",
					"Coulnd't find name for id: " + id
				)
			}
			return name
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