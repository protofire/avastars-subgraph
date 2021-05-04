import { Bytes } from "@graphprotocol/graph-ts";
import { GlobalState } from "../../../generated/schema";

export namespace global {

	export namespace constants {
		export let GLOBAL_STATE_ID = "0xgbs0"
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
		return globalState as GlobalState
	}

	export function setSeries(seriesId: string): GlobalState {
		let globalState = getGlobalState()
		globalState.currentSeries = seriesId
		return globalState as GlobalState
	}

	export function setAvastarTeleporterAddress(address: Bytes): GlobalState {
		let globalState = getGlobalState()
		globalState.avastarTeleporterAddress = address
		return globalState as GlobalState
	}

	export function setAvastarprimeMinterAddress(address: Bytes): GlobalState {
		let globalState = getGlobalState()
		globalState.avastarPrimeMinterAddress = address
		return globalState as GlobalState
	}

	export function setPaused(paused: boolean): GlobalState {
		let globalState = getGlobalState()
		globalState.avastarPrimeMinterPaused = paused
		return globalState as GlobalState
	}
}