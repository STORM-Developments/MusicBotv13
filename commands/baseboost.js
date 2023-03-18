const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('baseboost')
    .setDescription('Boosts the audio quality.'),
  async execute(interaction, client) {
    const player = client.manager.players.get(interaction.guildId);

    if (!player || !player.playing) {
      return interaction.reply({ content: 'There is no song currently playing.', ephemeral: true });
    }

    // Save the current volume and set a higher volume
    const currentVolume = player.volume;
    player.setVolume(150); // Change this value to the desired boost level

    interaction.reply('Audio quality boosted.');

    // After a certain amount of time, revert the volume to the previous level
    setTimeout(() => {
      player.setVolume(currentVolume);
      interaction.followUp('Audio quality boost ended.');
    }, 10000); // Change this value to the desired boost duration (in milliseconds)
  },
};
