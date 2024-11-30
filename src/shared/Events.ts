import { Networking } from "@flamework/networking";
import { Players } from "@rbxts/services";
interface ClientToServerEvents {
	click: () => void;
	clickEvent: (player: Player) => void;
}

interface ServerToClientEvents {
	updateClicks: (clicks: number) => void;
}

const GlobalEvents = Networking.createEvent<
	ClientToServerEvents,
	ServerToClientEvents
>();

export const ClientEvents = GlobalEvents.createClient({});
export const ServerEvents = GlobalEvents.createServer({});
