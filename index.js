const { Client, GatewayIntentBits, Partials } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {

    if (!message.author.bot) return;
    if (!message.embeds.length) return;

    const embed = message.embeds[0];
    if (!embed.title) return;

    const title = embed.title.toLowerCase();

    const allowed = [
        "ban",
        "tempban",
        "ipban",
        "mute",
        "tempmute",
        "warn",
        "jail"
    ];

    const blocked = [
        "unban",
        "unmute",
        "unwarn",
        "unjail",
        "unnote"
    ];

    if (!allowed.some(word => title.includes(word))) return;
    if (blocked.some(word => title.includes(word))) return;

    const embedData = embed.toJSON();

    await message.delete().catch(() => {});

    await message.channel.send({
        embeds: [embedData],
        components: [{
            type: 1,
            components: [
                {
                    type: 2,
                    style: 2,
                    label: "🔄 Reload",
                    custom_id: "reload"
                },
                {
                    type: 2,
                    style: 2,
                    label: "📃 Punishment History",
                    custom_id: "history"
                },
                {
                    type: 2,
                    style: 5,
                    label: "📨 Appeal",
                    url: "https://your-appeal-link.com"
                }
            ]
        }]
    });
});

client.on("interactionCreate", async (interaction) => {

    if (!interaction.isButton()) return;

    if (interaction.customId === "reload" ||
        interaction.customId === "history") {

        await interaction.reply({
            content: "This is only for moderators.",
            ephemeral: true
        });
    }
});

client.login(process.env.TOKEN);
