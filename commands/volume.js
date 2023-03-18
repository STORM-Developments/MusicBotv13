const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('volume')
    .setDescription('Sets the volume of the bot.')
    .addIntegerOption(option =>
      option
        .setName('value')
        .setDescription('Volume value (1-100)')
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const volume = interaction.options.getInteger('value');
    const player = client.manager.players.get(interaction.guildId);

    if (!player) {
      return interaction.reply({ content: 'There is no song currently playing.', ephemeral: true });
    }

    if (volume < 1 || volume > 100) {
      return interaction.reply({ content: 'Invalid volume value. Please provide a volume value between 1 and 100.', ephemeral: true });
    }

    player.setVolume(volume);
    interaction.reply(`Set the volume to ${volume}.`);
  },
};
