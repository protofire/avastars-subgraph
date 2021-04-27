import { BigInt } from '@graphprotocol/graph-ts'
import { Avastar } from "../../../generated/schema";
import { shared, generations, series as seriesModule } from "../index";

export namespace tokens {
	export function getNewAvastar(tokenId: string, accountId: string): Avastar {
		let avastar = Avastar.load(tokenId)
		if (avastar == null) {
			avastar = new Avastar(tokenId)
			avastar.owner = accountId
		}
		return avastar
	}
	export function loadAvastar(tokenId: string): Avastar {
		let avastar = Avastar.load(tokenId)
		if (avastar == null) {
			// maybe it should be created or loaded
			shared.logs.logCritical(
				"loadAvastar",
				"Couldn't find avastar w/ id: " + tokenId)
			// by this point indexing would be already stopped
			return avastar as Avastar
		}
		return avastar
	}
	export function mintAvastar(
		tokenId: string, serial: BigInt, generation: string, series: string
	): Avastar {
		let avastar = loadAvastar(tokenId)
		avastar.serial = serial
		avastar.generation = generations.helpers.getGenerationId(generation)
		avastar.series = seriesModule.helpers.getSeriesId(series)
		return avastar
	}
}
