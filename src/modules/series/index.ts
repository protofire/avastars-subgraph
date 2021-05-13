import { integer } from '@protofire/subgraph-toolkit'
import { TypedMap } from '@graphprotocol/graph-ts'
import { Series } from "../../../generated/schema"
import { shared } from "../shared"

export namespace series {
	export namespace constants {


		export function getNames(): TypedMap<string, string> {
			const SERIES_PROMO = "0x0"
			const SERIES_ONE = "0x1"
			const SERIES_TWO = "0x2"
			const SERIES_THREE = "0x3"
			const SERIES_FOUR = "0x4"
			const SERIES_FIVE = "0x5"

			let SERIES_NAMES = new TypedMap<string, string>()

			SERIES_NAMES.set(SERIES_PROMO, 'PROMO')
			SERIES_NAMES.set(SERIES_ONE, 'ONE')
			SERIES_NAMES.set(SERIES_TWO, 'TWO')
			SERIES_NAMES.set(SERIES_THREE, 'THREE')
			SERIES_NAMES.set(SERIES_FOUR, 'FOUR')
			SERIES_NAMES.set(SERIES_FIVE, 'FIVE')

			return SERIES_NAMES
		}
	}

	export namespace helpers {
		export function getSeriesName(id: string): string | null {
			return shared.helpers.getPropById(id, constants.getNames())
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