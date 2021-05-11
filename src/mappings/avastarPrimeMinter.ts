import {
	ContractUpgrade as ContractUpgradeEvent,
	CurrentGenerationSet as CurrentGenerationSetEvent,
	CurrentSeriesSet as CurrentSeriesSetEvent,
	TeleporterContractSet as TeleporterContractSetEvent
} from '../../generated/AvastarPrimeMinter/AvastarPrimeMinter'
import { ContractPaused, ContractUnpaused } from '../../generated/AvastarTeleporter/AvastarTeleporter'

import {
	global,
	generations,
	series as seriesModule,
	shared
} from '../modules'


export function handleCurrentGenerationSet(event: CurrentGenerationSetEvent): void {
	let generationId = shared.helpers.i32Tohex(event.params.currentGeneration)
	let globalState = global.setGeneration(generationId)
	globalState.save()
}

export function handleCurrentSeriesSet(event: CurrentSeriesSetEvent): void {
	let seriesId = shared.helpers.i32Tohex(event.params.currentSeries)
	let globalState = global.setSeries(seriesId)
	globalState.save()
}

export function handleTeleporterContractSet(event: TeleporterContractSetEvent): void {
	let teleporterState = global.teleporter.setAddress(event.params.contractAddress)
	teleporterState.save()
}

export function handleContractUpgrade(event: ContractUpgradeEvent): void {
	let primeMinterState = global.primeMinter.setAddress(event.params.newContract)
	primeMinterState.save()
}

export function handleContractPaused(event: ContractPaused): void {
	let primeMinterState = global.primeMinter.setPaused(true)
	primeMinterState.save()
}

export function handleContractUnpaused(event: ContractUnpaused): void {
	let primeMinterState = global.primeMinter.setPaused(true)
	primeMinterState.save()
}

