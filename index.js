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

// 🔧 CUSTOMIZE
const SERVER_NAME = "Storm BD";
const SERVER_LOGO = "https://i.ibb.co.com/5htbZ7DX/0ceb70d2-b44e-4970-aa07-1d092574058e-1.png";
const APPEAL_LINK = "https://discord.com/channels/1266060642679394386/1304102065198600282";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once(Events.ClientReady, async () => {
    console.log(`Logged in as ${client.user.tag}`);

    // Register Slash Command
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


// 🔥 AUTO DETECT BANANNOUNCER EMBED
client.on(Events.MessageCreate, async (message) => {

    // Only detect bot messages
    if (!message.author.bot) return;

    // Must contain embed
    if (!message.embeds.length) return;

    // OPTIONAL: Filter by specific bot name
    // if (message.author.username !== "BanAnnouncer") return;

    const originalEmbed = message.embeds[0];

    const newEmbed = EmbedBuilder.from(originalEmbed)
        .setAuthor({ name: SERVER_NAME, iconURL: SERVER_LOGO })
        .setFooter({ text: SERVER_NAME });

    const row = new ActionRowBuilder().addComponents(

        new ButtonBuilder()
            .setCustomId('reload')
            .setLabel('🔄 Reload')
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setCustomId('history')
            .setLabel('📃 Punishment History')
            .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
            .setLabel('📨 Appeal')
            .setStyle(ButtonStyle.Link)
            .setURL(APPEAL_LINK)
    );

    try {
        await message.delete();

        await message.channel.send({
            embeds: [newEmbed],
            components: [row]
        });

    } catch (err) {
        console.error("Failed to replace embed:", err);
    }
});


// 🔥 BUTTON RESPONSE (Show-off system)
client.on(Events.InteractionCreate, async interaction => {

    if (interaction.isButton()) {

        if (!interaction.customId) return;

        await interaction.reply({
            content: "❌ Access Denied: Only administrators or moderators can use this.",
            ephemeral: true
        });
    }
});

client.login(TOKEN);
