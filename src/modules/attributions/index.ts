
import { BigInt, TypedMap } from '@graphprotocol/graph-ts'
import { integer } from '@protofire/subgraph-toolkit'
import { Attribution } from "../../../generated/schema"

export namespace attributions {

	export namespace helpers {
		export function getOrCreateAtribution(atributionId: string): Attribution {
			let attribution = Attribution.load(atributionId)
			if (attribution == null) {
				attribution = new Attribution(atributionId)
			}
			return attribution as Attribution
		}

		export function getAttributionId(generationId: string, timestamp: string): string {
			return generationId.concat("@").concat(timestamp)
		}

	}

	export function getNewAttribution(
		generationId: string,
		artist: string, uri: string, timestamp: BigInt
	): Attribution {
		let attribution = helpers.getOrCreateAtribution(
			helpers.getAttributionId(generationId, timestamp.toHex())
		)
		attribution.generation = generationId
		attribution.artist = artist
		attribution.infoUri = uri
		return attribution as Attribution
	}

}