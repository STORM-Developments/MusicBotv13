const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips the current song.'),
  async execute(interaction, client) {
    const player = client.manager.players.get(interaction.guildId);

    if (!player || !player.playing) {
      return interaction.reply({ content: 'There is no song to skip.', ephemeral: true });
    }

    player.stop();
    interaction.reply('Skipped the current song.');
  },
};
