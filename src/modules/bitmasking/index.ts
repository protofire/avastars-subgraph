import { integer } from "@protofire/subgraph-toolkit"
import { BigInt } from "@graphprotocol/graph-ts"

export namespace bitmasking {
	export namespace constants {
		export let base = BigInt.fromI32(256)
		export let maxGenIndex = 31
		// export let slot_0 = base.pow(0) // gen 1
		// export let slot_1 = base.pow(1)
		// export let slot_30 = base.pow(30)
		// export let slot_31 = base.pow(31) // gen 32
	}
	export namespace helpers {
		export function getVariationByGene(gene: i32, hash: BigInt): BigInt {
			return hash.bitAnd(constants.base.pow(u8(gene)))
		}

	}
}