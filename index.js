const { 
    Client, 
    GatewayIntentBits, 
    Partials,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    Events
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
});

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {

    if (message.author.bot) return;
    if (!message.embeds.length) return;

    console.log("Embed detected!");

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setCustomId('reload')
            .setLabel('🔄 Reload')
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId('history')
            .setLabel('📃 Punishment History')
            .setStyle(ButtonStyle.Secondary),

        new ButtonBuilder()
            .setCustomId('appeal')
            .setLabel('📨 Appeal')
            .setStyle(ButtonStyle.Success),
    );

    await message.channel.send({
        content: "Test Buttons:",
        components: [row]
    });
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;

    await interaction.reply({
        content: `You clicked ${interaction.customId}`,
        ephemeral: true
    });
});

client.login(process.env.TOKEN);
