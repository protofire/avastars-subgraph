import { Bytes } from "@graphprotocol/graph-ts";
import { GlobalState, TeleporterState, PrimeMinterState } from "../../../generated/schema";

export namespace global {

	export namespace constants {
		export let GLOBAL_STATE_ID = "0xgbs0"
		export let TELEPORTER_STATE_ID = "0xgbs1"
		export let PRIME_MINTER_STATE_ID = "0xgbs2"
	}

	export function getGlobalState(): GlobalState {
		let globalState = GlobalState.load(constants.GLOBAL_STATE_ID)
		if (globalState == null) {
			globalState = new GlobalState(constants.GLOBAL_STATE_ID)
		}
		return globalState as GlobalState
	}

	export function setGeneration(generationId: string): GlobalState {
		let globalState = getGlobalState()
		globalState.currentGeneration = generationId
		globalState.teleporter = constants.TELEPORTER_STATE_ID
		globalState.primeMinter = constants.PRIME_MINTER_STATE_ID
		return globalState as GlobalState
	}

	export function setSeries(seriesId: string): GlobalState {
		let globalState = getGlobalState()
		globalState.currentSeries = seriesId
		return globalState as GlobalState
	}
	export namespace teleporter {

		export function getTeleporterState(): TeleporterState {
			let teleporterState = TeleporterState.load(constants.TELEPORTER_STATE_ID)
			if (teleporterState == null) {
				teleporterState = new TeleporterState(constants.TELEPORTER_STATE_ID)
			}
			return teleporterState as TeleporterState
		}
		export function setAddress(address: Bytes): TeleporterState {
			let teleporterState = getTeleporterState()
			teleporterState.address = address
			return teleporterState as TeleporterState
		}
		export function setPaused(paused: boolean): TeleporterState {
			let teleporterState = getTeleporterState()
			teleporterState.paused = paused
			return teleporterState as TeleporterState
		}

	}
	export namespace primeMinter {

		export function getPrimeMinterState(): PrimeMinterState {
			let primeMinterState = PrimeMinterState.load(constants.PRIME_MINTER_STATE_ID)
			if (primeMinterState == null) {
				primeMinterState = new PrimeMinterState(constants.PRIME_MINTER_STATE_ID)
			}
			return primeMinterState as TeleporterState
		}
		export function setAddress(address: Bytes): PrimeMinterState {
			let primeMinterState = getPrimeMinterState()
			primeMinterState.address = address
			return primeMinterState as PrimeMinterState
		}
		export function setPaused(paused: boolean): PrimeMinterState {
			let primeMinterState = getPrimeMinterState()
			primeMinterState.paused = paused
			return primeMinterState as PrimeMinterState
		}

	}

}