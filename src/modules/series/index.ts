import { integer } from '@protofire/subgraph-toolkit'
import { TypedMap } from '@graphprotocol/graph-ts'
import { Serie } from "../../../generated/schema"
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

		export function getSerieName(id: string): string | null {
			return shared.helpers.getPropById(id, constants.getNames())
		}

		export function getOrCreateSerie(serieId: string): Serie {
			let serie = Serie.load(serieId)
			if (serie == null) {
				serie = new Serie(serieId)
				serie.name = getSerieName(serieId)
				serie.minted = integer.ZERO
			}
			return serie as Serie

		}

	}



	export function increaseSeriesMinted(serieId: string): Serie {
		let serie = helpers.getOrCreateSerie(serieId)
		serie.minted = serie.minted.plus(integer.ONE)
		return serie as Serie
	}
}