import { BigInt } from '@graphprotocol/graph-ts'
import { Avastar } from "../../../generated/schema";
import { shared, generations, series as seriesModule, waves } from "../index";

export namespace tokens {
	export function getNewAvastar(tokenId: string, accountId: string): Avastar {
		let avastar = Avastar.load(tokenId)
		if (avastar == null) {
			avastar = new Avastar(tokenId)
			avastar.owner = accountId
		}
		return avastar as Avastar
	}

	export function loadAvastar(tokenId: string): Avastar {
		let avastar = Avastar.load(tokenId)
		if (avastar == null) {
			// maybe it should be created or loaded
			shared.logs.logCritical(
				"loadAvastar",
				"Couldn't find avastar w/ id: " + tokenId)
			// by this point indexing would be already stopped
			return avastar as Avastar as Avastar
		}
		return avastar as Avastar
	}

	export function mintPrime(
		tokenId: string, serial: BigInt, generation: string,
		series: string, gender: string, traitsId: string
	): Avastar {
		let avastar = loadAvastar(tokenId)
		avastar.serial = serial
		avastar.generation = generation
		avastar.series = series
		avastar.gender = gender
		avastar.traits = traitsId
		avastar.wave = waves.constants.WAVE_PRIME
		avastar.replicated = false
		return avastar as Avastar
	}

	export function mintReplicant(
		tokenId: string, serial: BigInt, generation: string,
		gender: string, traitsId: string
	): Avastar {
		let avastar = loadAvastar(tokenId)
		avastar.serial = serial
		avastar.generation = generation
		avastar.gender = gender
		avastar.traits = traitsId
		avastar.wave = waves.constants.WAVE_PREPLICANT
		return avastar as Avastar
	}

	export function changeOwner(tokenId: string, owner: string): Avastar {
		let avastar = loadAvastar(tokenId)
		avastar.owner = owner
		return avastar as Avastar
	}

	export function addApproval(tokenId: string, approval: string): Avastar {
		let avastar = loadAvastar(tokenId)
		avastar.approval = approval
		return avastar as Avastar
	}
}
