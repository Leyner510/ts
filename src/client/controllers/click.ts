import { Controller, OnStart } from "@flamework/core";
import { UserInputService } from "@rbxts/services";
import { ClientEvents } from "shared/events";
import { atom } from "@rbxts/charm";
import { Players } from "@rbxts/services";
import CharmSync from "@rbxts/charm-sync";

@Controller({})
export class Click implements OnStart {
	private clickAtom = atom<number>(0);

	public async onStart() {
		
	}
}

// UserInputService.InputBegan.Connect((input) => {
// 	if (input.UserInputType !== Enum.UserInputType.MouseButton1) return;

// 	ClientEvents.click.fire();
// });

// ClientEvents.updateClicks.connect((clicks) => {
// 	print(`your clicks is ${clicks}`)
// })