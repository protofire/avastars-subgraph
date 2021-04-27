import {
	CurrentGenerationSet as CurrentGenerationSetEvent,
	CurrentSeriesSet as CurrentSeriesSetEvent,
	TeleporterContractSet as TeleporterContractSetEvent
} from '../../generated/AvastarPrimeMinter/AvastarPrimeMinter'

import {
	global,
	generations,
	series as seriesModule
} from '../modules'


export function handleTeleporterContractSet(event: TeleporterContractSetEvent) {
	let globalState = global.setAvastarTeleporter(event.params.contractAddress)
	globalState.save()
}

export function handleCurrentGenerationSet(event: CurrentGenerationSetEvent) {
	let generationId = generations.helpers.getGenerationId(event.params.currentGeneration.toHex())
	let globalState = global.setGeneration(generationId)
	globalState.save()
}

export function handleCurrentSeriesSetEvent(event: CurrentSeriesSetEvent) {
	let seriesId = seriesModule.helpers.getSeriesId(event.params.currentSeries.toHex())
	let globalState = global.setSeries(seriesId)
	globalState.save()
}