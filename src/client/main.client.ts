import { ClientEvents } from "shared/Events";
import { Players, UserInputService, GuiService } from "@rbxts/services";


UserInputService.InputBegan.Connect((input, gameProcessed) => {
    if (gameProcessed) return;
    if (input.KeyCode === Enum.KeyCode.E) {
        ClientEvents.click.fire();
    }
})

ClientEvents.updateClicks.connect((clicks: number) => {
    print(`You have ${clicks} clicks!`);
});

