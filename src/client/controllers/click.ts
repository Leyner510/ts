import { Controller, OnStart } from "@flamework/core";
import { UserInputService } from "@rbxts/services";
import { ClientEvents } from "shared/events";

@Controller({})
export class Click implements OnStart {
	public onStart() {
		UserInputService.InputBegan.Connect((input) => {
			if (input.UserInputType !== Enum.UserInputType.MouseButton1) return;

			ClientEvents.click.fire();
		});

		ClientEvents.updateClicks.connect((clicks) => {
			print(`your clicks is ${clicks}`)
		})
	}
}
