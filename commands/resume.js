const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('resume')
    .setDescription('Resumes the current song.'),
  async execute(interaction, client) {
    const player = client.manager.players.get(interaction.guildId);

    if (!player || !player.paused) {
      return interaction.reply({ content: 'There is no song currently paused.', ephemeral: true });
    }

    player.pause(false);
    interaction.reply('Resumed the current song.');
  },
};
