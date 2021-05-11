import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { BigInt } from "@graphprotocol/graph-ts";
import { Mint, Burn, Transfer, Delegation, Deposit } from "../../../generated/schema";

export namespace transactions {

	export namespace constants {
		export let TRANSACTION_MINT = "MINT"
		export let TRANSACTION_BURN = "BURN"
		export let TRANSACTION_TRANSFER = "TRANSFER"
		export let TRANSACTION_DEPOSIT = "DEPOSIT"
	}

	export namespace helpers {
		export function getNewTransactionId(
			from: string, to: string, timestamp: BigInt
		): string {
			return from + "-" + to + "-" + timestamp.toString()
		}

		export function getDelegationId(
			owner: string, operator: string
		): string {
			return owner + "-" + operator
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
		transaction.type = constants.TRANSACTION_MINT
		return transaction as Mint
	}

	export function getNewBurn(from: string, token: string, timestamp: BigInt): Burn {
		let transaction = new Burn(helpers.getNewTransactionId(from, ADDRESS_ZERO, timestamp))
		transaction.from = from
		transaction.to = ADDRESS_ZERO
		transaction.token = token
		transaction.timestamp = timestamp
		transaction.type = constants.TRANSACTION_BURN
		return transaction as Burn
	}

	export function getNewTransfer(
		from: string, to: string,
		token: string, timestamp: BigInt
	): Transfer {
		let transaction = new Transfer(helpers.getNewTransactionId(from, to, timestamp))
		transaction.from = from
		transaction.to = to
		transaction.token = token
		transaction.timestamp = timestamp
		transaction.type = constants.TRANSACTION_TRANSFER
		return transaction as Transfer
	}

	export function getNewDeposit(
		from: string, to: string,
		amount: BigInt, timestamp: BigInt
	): Deposit {
		let transaction = new Deposit(helpers.getNewTransactionId(from, to, timestamp))
		transaction.from = from
		transaction.to = to
		transaction.amount = amount
		transaction.timestamp = timestamp
		transaction.type = constants.TRANSACTION_DEPOSIT
		return transaction as Deposit
	}

	export function getNewDelegation(owner: string, operator: string, approved: boolean): Delegation {
		let delegationId = helpers.getDelegationId(owner, operator)
		let delegation = new Delegation(delegationId)
		delegation.operator = operator
		delegation.owner = owner
		delegation.approved = approved
		return delegation as Delegation
	}
}