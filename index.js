const {
    Client,
    GatewayIntentBits,
    Events
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, () => {
    console.log("BOT READY");
});

client.on(Events.MessageCreate, (message) => {
    console.log("MESSAGE EVENT TRIGGERED");
});

client.on(Events.InteractionCreate, (interaction) => {
    console.log("INTERACTION EVENT TRIGGERED");
});

client.login(process.env.TOKEN);
