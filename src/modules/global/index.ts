import { Bytes } from "@graphprotocol/graph-ts";
import {
	GlobalState,
	TeleporterState,
	PrimeMinterState,
	MetadataState
} from "../../../generated/schema";

export namespace global {

	export namespace constants {
		export let GLOBAL_STATE_ID = "0xgbs0"
		export let TELEPORTER_STATE_ID = "0xgbs1"
		export let PRIME_MINTER_STATE_ID = "0xgbs2"
		export let METADATA_STATE_ID = "0xgbs3"
	}

	export function getGlobalState(): GlobalState {
		let state = GlobalState.load(constants.GLOBAL_STATE_ID)
		if (state == null) {
			state = new GlobalState(constants.GLOBAL_STATE_ID)
			state.teleporter = constants.TELEPORTER_STATE_ID
			state.primeMinter = constants.PRIME_MINTER_STATE_ID
			state.metadata = constants.METADATA_STATE_ID
		}
		return state as GlobalState
	}

	export function setGeneration(generationId: string): GlobalState {
		let state = getGlobalState()
		state.currentGeneration = generationId
		return state as GlobalState
	}

	export function setSeries(seriesId: string): GlobalState {
		let state = getGlobalState()
		state.currentSerie = seriesId
		return state as GlobalState
	}
	export namespace teleporter {

		export function getTeleporterState(): TeleporterState {
			let state = TeleporterState.load(constants.TELEPORTER_STATE_ID)
			if (state == null) {
				state = new TeleporterState(constants.TELEPORTER_STATE_ID)
			}
			return state as TeleporterState
		}
		export function setAddress(address: Bytes): TeleporterState {
			let state = getTeleporterState()
			state.address = address
			return state as TeleporterState
		}
		export function setPaused(paused: boolean): TeleporterState {
			let state = getTeleporterState()
			state.paused = paused
			return state as TeleporterState
		}

	}
	export namespace primeMinter {

		export function getPrimeMinterState(): PrimeMinterState {
			let state = PrimeMinterState.load(constants.PRIME_MINTER_STATE_ID)
			if (state == null) {
				state = new PrimeMinterState(constants.PRIME_MINTER_STATE_ID)
			}
			return state as PrimeMinterState
		}
		export function setAddress(address: Bytes): PrimeMinterState {
			let state = getPrimeMinterState()
			state.address = address
			return state as PrimeMinterState
		}
		export function setPaused(paused: boolean): PrimeMinterState {
			let state = getPrimeMinterState()
			state.paused = paused
			return state as PrimeMinterState
		}

	}
	export namespace metadata {

		export function getMetadataState(): MetadataState {
			let state = MetadataState.load(constants.METADATA_STATE_ID)
			if (state == null) {
				state = new MetadataState(constants.METADATA_STATE_ID)
			}
			return state as MetadataState
		}
		export function setAddress(address: Bytes): MetadataState {
			let state = getMetadataState()
			state.address = address
			return state as MetadataState
		}
	}

}