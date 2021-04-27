import {
	NewPrime as NewPrimeEvent,
	Transfer as TransferEvent
} from '../generated/AvastarTeleporter/AvastarTeleporter'

import { ADDRESS_ZERO } from '@protofire/subgraph-toolkit'

import { Bytes } from '@graphprotocol/graph-ts'
import {
	accounts,
	tokens,
	generations,
	genders,
	series as seriesModule,
} from './modules'

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
		return handleMint(event.params.to, tokenId)
	}

}

export function handleMintNewPrime(event: NewPrimeEvent): void {
	let tokenId = event.params.id.toHex()

	let generationName = event.params.generation.tohex()
	let generationId = generations.helpers.getGenerationId(generationName)

	let seriesName = event.params.series.toHex()
	let seriesId = seriesModule.helpers.getSeriesId(seriesName)

	let genderName = event.params.series.toHex()
	let genderId = genders.helpers.getGenderId(genderName)

	let avastar = tokens.mintAvastar(
		tokenId,
		event.params.serial,
		generationId,
		seriesId,
		genderId
	)
	avastar.save()

	let generation = generations.increaseGenerationMinted(generationId, generationName)
	generation.save()

	let series = seriesModule.increaseSeriesMinted(seriesId, seriesName)
	series.save()

	let gender = genders.increaseGenderMinted(genderId, genderName)
	gender.save()

}