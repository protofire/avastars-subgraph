import { integer } from '@protofire/subgraph-toolkit'
import { Gender } from "../../../generated/schema"
import { shared } from "../shared"
export namespace genders {
	export namespace constants {
		export let GENDER_ANY = "ANY"
		export let GENDER_MALE = "MALE"
		export let GENDER_FEMALE = "FEMALE"


		export let GENDER_IDS = new Map<string, string>()
		GENDER_IDS.set(GENDER_ANY, "0xgn0")
		GENDER_IDS.set(GENDER_MALE, "0xgn1")
		GENDER_IDS.set(GENDER_FEMALE, "0xgn2")

	}

	export namespace helpers {
		export function getGenderId(name: string): string | null {
			let genderId: string | null = constants.GENDER_IDS.has(name) ?
				constants.GENDER_IDS.get(name) : null
			if (genderId == null) {
				shared.logs.logInfo(
					"getGenderByName",
					"Coulnd't find id for name: " + name
				)
			}
			return name
		}

		export function getOrCreateGender(genderId: string, name: string): Gender {
			let gender = Gender.load(genderId)
			if (gender == null) {
				gender = new Gender(genderId)
				gender.name = name
				gender.minted = integer.ZERO
			}
			return gender as Gender

		}

	}

	export function increaseGenderMinted(genderId: string, name: string): Gender {
		let gender = helpers.getOrCreateGender(genderId, name)
		gender.minted = gender.minted.plus(integer.ONE)
		return gender as Gender
	}
}