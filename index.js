const {
    Client,
    GatewayIntentBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    Events
} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
});

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}`);
});

/*
COMMAND:
Type !buttons in any channel
Bot will send embed with buttons
*/

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'reload') {
        await interaction.reply({
            content: "🔄 Reload requested.",
            ephemeral: true
        });
    }

    if (interaction.customId === 'history') {
        await interaction.reply({
            content: "📃 Punishment history requested.",
            ephemeral: true
        });
    }

    if (interaction.customId === 'appeal') {
        await interaction.reply({
            content: "📨 Appeal link: https://your-appeal-link.com",
            ephemeral: true
        });
    }
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content === '!buttons') {

        const embed = new EmbedBuilder()
            .setTitle("Ban System")
            .setDescription("Choose an option below:")
            .setColor(0xff0000);

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
            embeds: [embed],
            components: [row]
        });
    }
});

client.login(process.env.TOKEN);
