const fs = require('fs');
const { Client, Intents } = require('discord.js');
const { Manager } = require('erela.js');
const { Spotify } = require('erela.js-spotify');
const config = require('./config');

const client = new Client({ intents: [Intents.FLAGS.Guilds, Intents.FLAGS.GuildMessages, Intents.FLAGS.GuildVoiceStates] });

client.commands = new Map();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);

  client.manager = new Manager({
    nodes: config.lavalinkNodes,
    send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    },
  })
    .use(new Spotify({ clientID: config.spotifyClientId, clientSecret: config.spotifyClientSecret }))
    .on('nodeConnect', node => console.log(`Node ${node.options.identifier} connected`))
    .on('nodeError', (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
    .on('trackStart', (player, track) => {
      const channel = client.channels.cache.get(player.textChannel);
      channel.send(`Now playing: ${track.title}`);
    })
    .on('queueEnd', player => {
      const channel = client.channels.cache.get(player.textChannel);
      channel.send('Queue has ended.');

      client.manager.leave(player.guild);
      player.destroy();
    });

  client.manager.init(client.user.id);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command.', ephemeral: true });
  }
});

client.login(config.token);
