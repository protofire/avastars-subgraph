import {
	ContractUpgrade as ContractUpgradeEvent,
	CurrentGenerationSet as CurrentGenerationSetEvent,
	CurrentSeriesSet as CurrentSeriesSetEvent,
	TeleporterContractSet as TeleporterContractSetEvent,
	DepositorBalance as DepositorBalanceEvent,
	FranchiseBalanceWithdrawn as FranchiseBalanceWithdrawnEvent,
} from '../../generated/AvastarPrimeMinter/AvastarPrimeMinter'
import { ContractPaused, ContractUnpaused } from '../../generated/AvastarTeleporter/AvastarTeleporter'

import {
	accounts,
	global,
	shared,
	transactions
} from '../modules'

export function handleFranchiseBalanceWithdrawn(event: FranchiseBalanceWithdrawnEvent): void {
	let ownerAddress = event.params.owner
	let amount = event.params.amount

	let contractAccount = accounts.decreaseAccountEth(event.address, amount)
	contractAccount.save()

	let owner = accounts.increaseAccountEth(ownerAddress, amount)
	owner.save()

	let transaction = transactions.getNewDeposit(
		contractAccount.id, owner.id,
		amount, event.block.timestamp
	)
	transaction.save()
}

export function handleDepositorBalance(event: DepositorBalanceEvent): void {
	let depositorAddress = event.params.depositor
	let balance = event.params.balance

	let depositor = accounts.getAccount(depositorAddress)
	depositor.save()

	let contractAccount = accounts.increaseAccountEth(event.address, balance)
	contractAccount.save()

	let transaction = transactions.getNewDeposit(
		depositor.id, contractAccount.id,
		balance, event.block.timestamp
	)
	transaction.save()
}


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

