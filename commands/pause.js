const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the current song.'),
  async execute(interaction, client) {
    const player = client.manager.players.get(interaction.guildId);

    if (!player || !player.playing) {
      return interaction.reply({ content: 'There is no song currently playing.', ephemeral: true });
    }

    player.pause(true);
    interaction.reply('Paused the current song.');
  },
};
