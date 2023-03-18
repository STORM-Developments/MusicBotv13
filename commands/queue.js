const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Displays the current song queue.'),
  async execute(interaction, client) {
    const player = client.manager.players.get(interaction.guildId);

    if (!player || !player.queue.size) {
      return interaction.reply({ content: 'There is no song in the queue.', ephemeral: true });
    }

    const queueString = player.queue.map((track, index) => `${index + 1}. ${track.title}`).join('\n');
    interaction.reply(`Current queue:\n${queueString}`);
  },
};
