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

// 🔧 CUSTOMIZE HERE
const SERVER_NAME = "Storm BD";
const SERVER_LOGO = "https://i.ibb.co.com/5htbZ7DX/0ceb70d2-b44e-4970-aa07-1d092574058e-1.png";
const APPEAL_LINK = "https://discord.com/channels/1266060642679394386/1304102065198600282";

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const commands = [
        new SlashCommandBuilder()
            .setName('buttons')
            .setDescription('Show moderation panel')
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

    // Slash Command
    if (interaction.isChatInputCommand()) {

        if (interaction.commandName === 'buttons') {

            const embed = new EmbedBuilder()
                .setAuthor({ name: SERVER_NAME, iconURL: SERVER_LOGO })
                .setTitle("Moderation Panel")
                .setDescription("Use the buttons below.")
                .setColor(0xff0000)
                .setThumbnail(SERVER_LOGO)
                .setFooter({ text: SERVER_NAME });

            const row = new ActionRowBuilder().addComponents(

                // 🔵 Reload (Blue)
                new ButtonBuilder()
                    .setCustomId('reload')
                    .setLabel('🔄 Reload')
                    .setStyle(ButtonStyle.Primary),

                // 🔵 Punishment History (Blue)
                new ButtonBuilder()
                    .setCustomId('history')
                    .setLabel('📃 Punishment History')
                    .setStyle(ButtonStyle.Primary),

                // 🔗 Appeal (Link Button)
                new ButtonBuilder()
                    .setLabel('📨 Appeal')
                    .setStyle(ButtonStyle.Link)
                    .setURL(APPEAL_LINK)
            );

            await interaction.reply({
                embeds: [embed],
                components: [row]
            });
        }
    }

    // Button Click
    if (interaction.isButton()) {

        // Appeal button auto handled by Discord (no reply needed)
        if (!interaction.customId) return;

        await interaction.reply({
            content: "❌ Access Denied: Only administrators or moderators can use this.",
            ephemeral: true
        });
    }
});

client.login(TOKEN);


client.login(TOKEN);
