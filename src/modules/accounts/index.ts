import { BigInt, Bytes } from '@graphprotocol/graph-ts';
import { integer } from '@protofire/subgraph-toolkit'

import { Account } from '../../../generated/schema'

export namespace accounts {
	export function getAccount(accountAddress: Bytes): Account {
		let accountId = accountAddress.toHex()

		let account = Account.load(accountId)
		if (account == null) {
			account = new Account(accountId)
			account.ethAmount = integer.ZERO
			account.address = accountAddress
		}
		return account as Account
	}

	export function increaseAccountEth(accountAddress: Bytes, amount: BigInt): Account {
		let account = getAccount(accountAddress)
		account.ethAmount = account.ethAmount.plus(amount)
		return account as Account
	}

	export function decreaseAccountEth(accountAddress: Bytes, amount: BigInt): Account {
		let account = getAccount(accountAddress)
		account.ethAmount = account.ethAmount.minus(amount)
		return account as Account
	}
}