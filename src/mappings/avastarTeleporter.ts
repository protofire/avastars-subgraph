
import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { Bytes } from '@graphprotocol/graph-ts'

import {
	ContractPaused,
	ContractUnpaused,
	ContractUpgrade as ContractUpgradeEvent,
	NewPrime as NewPrimeEvent,
	Transfer as TransferEvent
} from '../../generated/AvastarTeleporter/AvastarTeleporter'

import {
	accounts,
	global,
	generations,
	genders,
	series as seriesModule,
	shared,
	tokens,
	traits,
} from '../modules'


function handleMint(to: Bytes, tokenId: string): void {
	let account = accounts.getAccount(to)
	account.save()
	let avastar = tokens.getNewAvastar(tokenId, to.toHex())
	avastar.save()
}

export function handleTransfer(event: TransferEvent): void {
	let from = event.params.from.toHex()
	let tokenId = event.params.tokenId.toHex()
	if (from == ADDRESS_ZERO) {
		handleMint(event.params.to, tokenId)
	}

}

export function handleMintNewPrime(event: NewPrimeEvent): void {
	let tokenId = event.params.id.toHex()

	let generationId = shared.helpers.i32Tohex(event.params.generation)

	let seriesName = shared.helpers.i32Tohex(event.params.series)
	let seriesId = seriesModule.helpers.getSeriesId(seriesName)

	let genderId = shared.helpers.i32Tohex(event.params.gender)

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

	let generation = generations.increaseGenerationMinted(generationId)
	generation.save()

	let series = seriesModule.increaseSeriesMinted(seriesId, seriesName)
	series.save()

	let gender = genders.increaseGenderMinted(genderId)
	gender.save()

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
