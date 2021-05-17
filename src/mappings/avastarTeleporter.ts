
import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'
import { BigInt, Bytes } from '@graphprotocol/graph-ts'

import {
	ContractPaused,
	ContractUnpaused,
	ContractUpgrade as ContractUpgradeEvent,
	NewPrime as NewPrimeEvent,
	NewTrait as NewTraitEvent,
	NewReplicant as NewReplicantEvent,
	Transfer as TransferEvent,
	Approval as ApprovalEvent,
	ApprovalForAll as ApprovalForAllEvent,
	AttributionSet as AttributionSetEvent,
} from '../../generated/AvastarTeleporter/AvastarTeleporter'

import {
	accounts,
	attributions,
	genders,
	generations,
	genes,
	global,
	series as seriesModule,
	shared,
	tokens,
	traits,
	transactions,
	rarities,
	waves,
} from '../modules'


function handleMint(to: Bytes, tokenId: string, timestamp: BigInt): void {

	let account = accounts.getAccount(to)
	account.save()

	let avastar = tokens.getNewAvastar(tokenId, account.id)
	avastar.save()

	let transaction = transactions.getNewMint(account.id, tokenId, timestamp)
	transaction.save()
}

function handleBurn(from: Bytes, tokenId: string, timestamp: BigInt): void {

	let account = accounts.getAccount(from)
	account.save()

	let avastar = tokens.changeOwner(tokenId, ADDRESS_ZERO)
	avastar.save()

	let transaction = transactions.getNewBurn(account.id, tokenId, timestamp)
	transaction.save()
}

function handleTransfer(from: Bytes, to: Bytes, tokenId: string, timestamp: BigInt): void {

	let seller = accounts.getAccount(from)
	seller.save()

	let buyer = accounts.getAccount(to)
	buyer.save()

	let avastar = tokens.changeOwner(tokenId, buyer.id)
	avastar.save()

	let transaction = transactions.getNewTransfer(seller.id, buyer.id, tokenId, timestamp)
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

export function handleApproval(event: ApprovalEvent): void {
	let tokenId = event.params.tokenId.toHex()
	let ownerAddress = event.params.owner
	let approvedAddress = event.params.approved

	let approved = accounts.getAccount(approvedAddress)
	approved.save()

	let owner = accounts.getAccount(ownerAddress)
	owner.save()

	let token = tokens.addApproval(tokenId, approved.id)
	token.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
	let ownerAddress = event.params.owner
	let operatorAddress = event.params.operator

	let owner = accounts.getAccount(ownerAddress)
	owner.save()

	let operator = accounts.getAccount(operatorAddress)
	operator.save()

	let delegation = transactions.getNewDelegation(owner.id, operator.id, event.params.approved)
	delegation.save()
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

	let avastar = tokens.mintPrime(
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


	let serie = seriesModule.increaseSeriesMinted(seriesId)
	serie.save()

	let wave = waves.increaseWaveMinted("0x0")
	wave.save()

}

export function handleNewReplicant(event: NewReplicantEvent): void {
	let tokenId = event.params.id.toHex()
	let generationId = shared.helpers.i32Tohex(event.params.generation)
	let genderId = shared.helpers.i32Tohex(event.params.gender)
	// Todo decode traits
	let traitsId = event.params.traits
	let trait = traits.getTraitById(traitsId, event.address)
	trait.save()

	let avastar = tokens.mintReplicant(
		tokenId,
		event.params.serial,
		generationId,
		genderId,
		traitsId.toHex()
	)
	avastar.save()

	let gender = genders.increaseGenderMinted(genderId)
	gender.save()

	let generation = generations.increaseGenerationMinted(generationId)
	generation.save()
	let wave = waves.increaseWaveMinted("0x1")
	wave.save()
}

export function handleNewTrait(event: NewTraitEvent): void {
	let traitId = event.params.id.toHex()
	let generation = shared.helpers.i32Tohex(event.params.generation)
	let geneId = shared.helpers.i32Tohex(event.params.gene)
	let rarityId = shared.helpers.i32Tohex(event.params.rarity)
	let variation = BigInt.fromI32(event.params.variation)
	let name = event.params.name

	let trait = traits.mintTrait(
		traitId, generation, geneId,
		rarityId, variation, name
	)
	trait.save()

	let gene = genes.increaseGeneMinted(geneId)
	gene.save()

	let rarity = rarities.increaseRarityMinted(rarityId)
	rarity.save()

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

export function handleAttributionSet(event: AttributionSetEvent): void {
	let generationId = shared.helpers.i32Tohex(event.params.generation)

	let attribution = attributions.getNewAttribution(
		generationId, event.params.artist,
		event.params.infoURI, event.block.timestamp
	)
	attribution.save()

	let generation = generations.setAtribution(generationId, attribution.id)
	generation.save()

}