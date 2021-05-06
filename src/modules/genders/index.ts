import { integer } from '@protofire/subgraph-toolkit'
import { Gender } from "../../../generated/schema"
import { shared } from "../shared"
export namespace genders {
	export namespace constants {
		export let GENDER_ANY = "0x0"
		export let GENDER_MALE = "0x1"
		export let GENDER_FEMALE = "0x2"

		export let GENDER_NAMES = new Map<string, string>()
		GENDER_NAMES.set(GENDER_ANY, "ANY")
		GENDER_NAMES.set(GENDER_MALE, "MALE")
		GENDER_NAMES.set(GENDER_FEMALE, "FEMALE")
	}

	export namespace helpers {
		export function getGenderNameById(id: string): string | null {
			let name: string | null = constants.GENDER_NAMES.has(id) ?
				constants.GENDER_NAMES.get(id) : null
			if (name == null) {
				shared.logs.logInfo(
					"getGenderByName",
					"Coulnd't find id for id: " + id
				)
			}
			return name
		}

		export function getOrCreateGender(genderId: string): Gender {
			let gender = Gender.load(genderId)
			if (gender == null) {
				gender = new Gender(genderId)
				gender.name = getGenderNameById(genderId)
				gender.minted = integer.ZERO
			}
			return gender as Gender

		}

	}

	export function increaseGenderMinted(genderId: string): Gender {
		let gender = helpers.getOrCreateGender(genderId)
		gender.minted = gender.minted.plus(integer.ONE)
		return gender as Gender
	}
}