import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { BigInt } from "@graphprotocol/graph-ts";
import { Mint } from "../../../generated/schema";

export namespace transactions {

	export namespace constants {
		export let TRANSACTION_MINT = "MINT"
	}

	export namespace helpers {
		export function getNewTransactionId(
			from: string, to: string, timestamp: BigInt
		): string {
			return from + "-" + to + "-" + timestamp.toString()
		}
	}

	export function getNewMint(
		to: string, token: string, timestamp: BigInt
	): Mint {
		let transaction = new Mint(helpers.getNewTransactionId(ADDRESS_ZERO, to, timestamp))
		transaction.from = ADDRESS_ZERO
		transaction.to = to
		transaction.token = token
		transaction.timestamp = timestamp
		return transaction as Mint
	}
}