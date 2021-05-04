import { Address } from "@graphprotocol/graph-ts";
import { AvastarTeleporter } from "../../../generated/AvastarTeleporter/AvastarTeleporter";

export namespace contracts {
	export namespace avastarTeleporter {
		export function getAvastarTeleporterInstance(address: Address): AvastarTeleporter {
			return AvastarTeleporter.bind(address)

		}
	}
}