const ReplicatedStorage = game.GetService("ReplicatedStorage");
const IconClickedEvent = ReplicatedStorage.WaitForChild("IconClickedEvent") as RemoteEvent;

const Icon = script.Parent as ClickDetector;

Icon.MouseClick.Connect(() => {
	IconClickedEvent.FireServer();
});
