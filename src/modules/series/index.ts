import { integer } from '@protofire/subgraph-toolkit'
import { Series } from "../../../generated/schema"
import { shared } from "../shared"

export namespace series {
	export namespace constants {
		export let SERIES_PROMO = "0x0"
		export let SERIES_ONE = "0x1"
		export let SERIES_TWO = "0x2"
		export let SERIES_THREE = "0x3"
		export let SERIES_FOUR = "0x4"
		export let SERIES_FIVE = "0x5"


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
				shared.logs.logInfo(
					"getSeriesId",
					"Coulnd't find id for name: " + name
				)
				// shared.logs.logCritical(
				// 	"getSeriesId",
				// 	"Coulnd't find id for name: " + name
				// )
			}
			return name
		}

		export function getOrCreateSeries(seriesId: string, name: string): Series {
			let series = Series.load(seriesId)
			if (series == null) {
				series = new Series(seriesId)
				series.name = name
				series.minted = integer.ZERO
			}
			return series as Series

		}

	}



	export function increaseSeriesMinted(seriesId: string, name: string): Series {
		let series = helpers.getOrCreateSeries(seriesId, name)
		series.minted = series.minted.plus(integer.ONE)
		return series as Series
	}
}