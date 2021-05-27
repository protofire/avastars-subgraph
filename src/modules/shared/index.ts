import { BigInt, TypedMap, log } from '@graphprotocol/graph-ts'

export namespace shared {
	export namespace logs {
		export function logInfo(functionName: string, message: string): void {
			log.info(functionName + ": " + message, [])
		}
		export function critical(): void {
			log.critical("", [])
		}
		export function warning(functionName: string, message: string): void {
			log.warning(functionName + ": " + message, [])
		}
	}

	export namespace helpers {

		export function i32Tohex(int32: i32): string {
			let hex = BigInt.fromI32(int32).toHex()
			// log.info("@@@@@@  i32 to hex: " + hex, [])
			return hex
		}

		export function getPropById(key: string, map: TypedMap<string, string>): string {
			let val = map.get(key) as string | null
			if (val == null) {
				log.info('@@@ getPropById ::: {} : {} ', [
					"Cannot find prop for key", key
				])
				log.warning('@@@ getPropById ::: {} : {} ', [
					"Cannot find prop for key", key
				])
				logs.critical()
				return ""
			}
			return val
		}

		export function getBigIntById(key: string, map: TypedMap<string, BigInt>): BigInt {
			let val = map.get(key) as BigInt | null
			if (val == null) {
				log.info('@@@ getPropById ::: {} : {} ', [
					"Cannot find prop for key", key
				])
				log.warning('@@@ getPropById ::: {} : {} ', [
					"Cannot find prop for key", key
				])
				logs.critical()
				return BigInt.fromString("0")
			}
			return val
		}
	}
}
