const {
    Client,
    GatewayIntentBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder,
    Events,
    REST,
    Routes,
    SlashCommandBuilder
} = require('discord.js');

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}`);

    // Register Slash Command when bot is ready
    const commands = [
        new SlashCommandBuilder()
            .setName('buttons')
            .setDescription('Show ban buttons')
            .toJSON()
    ];

    const rest = new REST({ version: '10' }).setToken(TOKEN);

    try {
        await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            { body: commands }
        );
        console.log('Slash command registered');
    } catch (error) {
        console.error(error);
    }
});

client.on(Events.InteractionCreate, async interaction => {

    if (interaction.isChatInputCommand()) {

        if (interaction.commandName === 'buttons') {

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

            await interaction.reply({
                embeds: [embed],
                components: [row]
            });
        }
    }

    if (interaction.isButton()) {

        if (interaction.customId === 'reload')
            await interaction.reply({ content: "🔄 Reload requested.", ephemeral: true });

        if (interaction.customId === 'history')
            await interaction.reply({ content: "📃 Punishment history requested.", ephemeral: true });

        if (interaction.customId === 'appeal')
            await interaction.reply({ content: "📨 Appeal link: https://your-link.com", ephemeral: true });
    }
});

client.login(TOKEN);
