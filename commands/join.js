module.exports = {
    name: 'join',
    description: 'Joins the voice channel of the user who requested the command.',
    async execute(interaction, client) {
      // Your join command logic here
    },
  };
  const { SlashCommandBuilder } = require('@discordjs/builders');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('join')
    .setDescription('Joins the voice channel of the user who requested the command.'),
  async execute(interaction, client) {
    const channel = interaction.member.voice.channel;

    if (!channel) {
      return interaction.reply({ content: 'You must be in a voice channel to use this command.', ephemeral: true });
    }

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
    });

    await interaction.reply(`Joined voice channel: **${channel.name}**`);
  },
};
