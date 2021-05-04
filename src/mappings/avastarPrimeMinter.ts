import {
	ContractUpgrade as ContractUpgradeEvent,
	CurrentGenerationSet as CurrentGenerationSetEvent,
	CurrentSeriesSet as CurrentSeriesSetEvent,
	TeleporterContractSet as TeleporterContractSetEvent
} from '../../generated/AvastarPrimeMinter/AvastarPrimeMinter'

import {
	global,
	generations,
	series as seriesModule,
	shared
} from '../modules'


export function handleTeleporterContractSet(event: TeleporterContractSetEvent): void {
	let globalState = global.setAvastarTeleporterAddress(event.params.contractAddress)
	globalState.save()
}

export function handleCurrentGenerationSet(event: CurrentGenerationSetEvent): void {
	let generationId = generations.helpers.getGenerationId(shared.helpers.i32Tohex(event.params.currentGeneration))
	let globalState = global.setGeneration(generationId)
	globalState.save()
}

export function handleCurrentSeriesSet(event: CurrentSeriesSetEvent): void {
	let seriesId = seriesModule.helpers.getSeriesId(shared.helpers.i32Tohex(event.params.currentSeries))
	let globalState = global.setSeries(seriesId)
	globalState.save()
}

export function handleContractUpgrade(event: ContractUpgradeEvent): void {
	let globalState = global.setAvastarTeleporterAddress(event.params.newContract)
	globalState.save()
}

export function handleContractPaused(): void {
	let globalState = global.setPaused(true)
	globalState.save()
}

export function handleContractUnpaused(): void {
	let globalState = global.setPaused(false)
	globalState.save()
}

