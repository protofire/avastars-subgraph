import { BigInt } from '@graphprotocol/graph-ts'
import { log } from '@graphprotocol/graph-ts'

export namespace shared {
	export namespace logs {
		export function logInfo(functionName: string, message: string): void {
			log.info(functionName + ": " + message, [])
		}
		export function logCritical(functionName: string, message: string): void {
			log.critical(functionName + ": " + message, [])
		}
	}

	export namespace helpers {
		export function i32Tohex(int32: i32): string {
			let hex = BigInt.fromI32(int32).toHex()
			log.info("@@@@@@  i32 to hex: " + hex, [])
			return hex
		}
	}
}