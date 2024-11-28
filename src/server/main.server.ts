const PlayerService = game.GetService("Players");
const ReplicatedStorage = game.GetService("ReplicatedStorage");

PlayerService.PlayerAdded.Connect((player) => {
	print(`Игрок ${player.Name} подключился к серверу!`);
});

PlayerService.PlayerRemoving.Connect((player) => {
	print(`Игрок ${player.Name} отключился от сервера!`);
});

// Создание RemoteEvent с помощью конструктора класса
const IconClickedEvent = new Instance("RemoteEvent");
IconClickedEvent.Name = "IconClickedEvent";
IconClickedEvent.Parent = ReplicatedStorage;

IconClickedEvent.OnServerEvent.Connect((player: Player) => {
	print(`Игрок ${player.Name} нажал на иконку!`);
});
