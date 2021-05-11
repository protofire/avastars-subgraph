
import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { BigInt, Bytes } from '@graphprotocol/graph-ts'

import {
	ContractPaused,
	ContractUnpaused,
	ContractUpgrade as ContractUpgradeEvent,
	NewPrime as NewPrimeEvent,
	Transfer as TransferEvent
} from '../../generated/AvastarTeleporter/AvastarTeleporter'

import {
	accounts,
	genders,
	generations,
	global,
	series as seriesModule,
	shared,
	tokens,
	traits,
	transactions,
} from '../modules'


function handleMint(to: Bytes, tokenId: string, timestamp: BigInt): void {

	let account = accounts.getAccount(to)
	account.save()

	let avastar = tokens.getNewAvastar(tokenId, to.toHex())
	avastar.save()

	// "to" is also being converted to str on getAccount
	let transaction = transactions.getNewMint(to.toHex(), tokenId, timestamp)
	transaction.save()
}

function handleBurn(from: Bytes, tokenId: string, timestamp: BigInt): void {

	let account = accounts.getAccount(from)
	account.save()

	let avastar = tokens.changeOwner(tokenId, ADDRESS_ZERO)
	avastar.save()

	// "to" is also being converted to str on getAccount
	let transaction = transactions.getNewBurn(from.toHex(), tokenId, timestamp)
	transaction.save()
}

function handleTransfer(from: Bytes, to: Bytes, tokenId: string, timestamp: BigInt): void {

	let buyer = accounts.getAccount(from)
	buyer.save()

	let seller = accounts.getAccount(from)
	seller.save()

	let avastar = tokens.changeOwner(tokenId, to.toHex())
	avastar.save()

	let transaction = transactions.getNewTransfer(from.toHex(), to.toHex(), tokenId, timestamp)
	transaction.save()
}

export function handleTransaction(event: TransferEvent): void {
	let from = event.params.from.toHex()
	let to = event.params.from.toHex()
	let tokenId = event.params.tokenId.toHex()
	let timestamp = event.block.timestamp
	if (from == ADDRESS_ZERO) {
		handleMint(event.params.to, tokenId, timestamp)
	} else if (to == ADDRESS_ZERO) {
		handleBurn(event.params.from, tokenId, timestamp)
	} else {
		handleTransfer(event.params.from, event.params.to, tokenId, timestamp)
	}

}

export function handleMintNewPrime(event: NewPrimeEvent): void {
	let tokenId = event.params.id.toHex()
	let generationId = shared.helpers.i32Tohex(event.params.generation)
	let seriesId = shared.helpers.i32Tohex(event.params.series)
	let genderId = shared.helpers.i32Tohex(event.params.gender)
	// Todo decode traits
	let traitsId = event.params.traits
	let trait = traits.getTraitById(traitsId, event.address)
	trait.save()

	let avastar = tokens.mintAvastar(
		tokenId,
		event.params.serial,
		generationId,
		seriesId,
		genderId,
		traitsId.toHex()
	)
	avastar.save()

	let gender = genders.increaseGenderMinted(genderId)
	gender.save()

	let generation = generations.increaseGenerationMinted(generationId)
	generation.save()


	let series = seriesModule.increaseSeriesMinted(seriesId)
	series.save()

}

export function handleMetadataContractAddressSet(event: ContractUpgradeEvent): void {
	let metadataState = global.metadata.setAddress(event.params.newContract)
	metadataState.save()
}

export function handleContractUpgrade(event: ContractUpgradeEvent): void {
	let teleporterState = global.teleporter.setAddress(event.params.newContract)
	teleporterState.save()
}

export function handleContractPaused(event: ContractPaused): void {
	let teleporterState = global.teleporter.setPaused(true)
	teleporterState.save()
}

export function handleContractUnpaused(event: ContractUnpaused): void {
	let teleporterState = global.teleporter.setPaused(true)
	teleporterState.save()
}
