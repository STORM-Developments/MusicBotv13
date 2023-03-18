const { SlashCommandBuilder } = require('@discordjs/builders');
const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('leave')
    .setDescription('Leaves the current voice channel.'),
  async execute(interaction, client) {
    const connection = getVoiceConnection(interaction.guild.id);

    if (!connection) {
      return interaction.reply({ content: 'I am not currently in a voice channel.', ephemeral: true });
    }

    connection.destroy();
    await interaction.reply('Left the voice channel.');
  },
};
