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


		export let SERIES_NAMES = new Map<string, string>()

		SERIES_NAMES.set(SERIES_PROMO, "PROMO")
		SERIES_NAMES.set(SERIES_ONE, "ONE")
		SERIES_NAMES.set(SERIES_TWO, "TWO")
		SERIES_NAMES.set(SERIES_THREE, "THREE")
		SERIES_NAMES.set(SERIES_FOUR, "FOUR")
		SERIES_NAMES.set(SERIES_FIVE, "FIVE")
	}

	export namespace helpers {
		export function getSeriesName(id: string): string | null {
			let seriesName: string | null = constants.SERIES_NAMES.has(id) ?
				constants.SERIES_NAMES.get(id) : null
			if (seriesName == null) {
				shared.logs.logInfo(
					"getSeriesId",
					"Coulnd't find name for id: " + id
				)
				return id
				// shared.logs.logCritical(
				// 	"getSeriesId",
				// 	"Coulnd't find id for name: " + name
				// )
			}
			return seriesName
		}

		export function getOrCreateSeries(seriesId: string): Series {
			let series = Series.load(seriesId)
			if (series == null) {
				series = new Series(seriesId)
				series.name = getSeriesName(seriesId)
				series.minted = integer.ZERO
			}
			return series as Series

		}

	}



	export function increaseSeriesMinted(seriesId: string): Series {
		let series = helpers.getOrCreateSeries(seriesId)
		series.minted = series.minted.plus(integer.ONE)
		return series as Series
	}
}