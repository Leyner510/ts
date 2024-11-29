import { Networking } from "@flamework/networking";
interface ClientToServerEvents{
    click: () => void;
}
interface ServerToClientEvents{    
     updateClicks: (clicks: number) => void;
}
const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const ClientEvents = GlobalEvents.createClient({});
export const ServerEvents = GlobalEvents.createServer({});


