import { Players } from "@rbxts/services";
import { ServerEvents } from "shared/Events";


interface ClickerData {
    clicks: number;
}


const clickerData: Map<number, ClickerData> = new Map<number, ClickerData>();

export class PlayerService {
    public start() {

        ServerEvents.click.connect((player) => {
            const playerId = player.UserId;
            if (clickerData.has(playerId)) {
                clickerData.set(playerId, {clicks:0})
        }

        const playerClicksData = clickerData.get(playerId);
        if (playerClicksData){
            playerClicksData.clicks += 1;
        }
        this.updateClicks();
    });
}

private updateClicks() {
    for (const player of Players.GetPlayers()) {
        const playerId = player.UserId;
        const playerClicksData = clickerData.get(playerId);
        if (playerClicksData) {
            ServerEvents.updateClicks.fire(player, playerClicksData.clicks);
            
        }
    };
}
}