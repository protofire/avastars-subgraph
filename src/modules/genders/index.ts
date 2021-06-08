import { integer } from '@protofire/subgraph-toolkit'
import { TypedMap } from '@graphprotocol/graph-ts'
import { Gender } from "../../../generated/schema"
import { shared } from "../shared"
export namespace genders {
	export namespace constants {
		export function getNames(): TypedMap<string, string> {
			let GENDER_ANY = "0x0"
			let GENDER_MALE = "0x1"
			let GENDER_FEMALE = "0x2"
			let GENDER_NAMES = new TypedMap<string, string>()
			GENDER_NAMES.set(GENDER_ANY, "ANY")
			GENDER_NAMES.set(GENDER_MALE, "MALE")
			GENDER_NAMES.set(GENDER_FEMALE, "FEMALE")
			return GENDER_NAMES
		}
	}

	export namespace helpers {
		export function getGenderNameById(id: string): string | null {
			return shared.helpers.getPropById(id, constants.getNames())
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