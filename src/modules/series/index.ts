import { integer } from '@protofire/subgraph-toolkit'
import { Series } from "../../../generated/schema"
import { shared } from "../shared"

export namespace series {
	export namespace constants {
		export let SERIES_PROMO = "PROMO"
		export let SERIES_ONE = "ONE"
		export let SERIES_TWO = "TWO"
		export let SERIES_THREE = "THREE"
		export let SERIES_FOUR = "FOUR"
		export let SERIES_FIVE = "FIVE"


		export let SERIES_IDS = new Map<string, string>()

		SERIES_IDS.set(SERIES_PROMO, "0xs0")
		SERIES_IDS.set(SERIES_ONE, "0xs1")
		SERIES_IDS.set(SERIES_TWO, "0xs2")
		SERIES_IDS.set(SERIES_THREE, "0xs3")
		SERIES_IDS.set(SERIES_FOUR, "0xs4")
		SERIES_IDS.set(SERIES_FIVE, "0xs5")
	}

	export namespace helpers {
		export function getSeriesId(name: string): string | null {
			let seriesId: string | null = constants.SERIES_IDS.has(name) ?
				constants.SERIES_IDS.get(name) : null
			if (seriesId == null) {
				shared.logs.logCritical(
					"getSeriesId",
					"Coulnd't find id for name: " + name
				)
			}
			return seriesId
		}

		export function getOrCreateSeries(seriesId: string, name: string): Series {
			let generation = Series.load(seriesId)
			if (generation == null) {
				generation = new Series(seriesId)
				generation.name = name
				generation.minted = integer.ZERO
			}
			return generation

		}

	}

	export function getSeriesByName(name: string): Series {
		let seriesId = helpers.getSeriesId(name)
		let generation = helpers.getOrCreateSeries(seriesId, name)
		return generation
	}

	export function increaseSeriesMinted(name: string): Series {
		let generation = getSeriesByName(name)
		generation.minted = generation.minted.plus(integer.ONE)
		return generation
	}
}