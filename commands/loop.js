const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('loop')
    .setDescription('Loops the current song or queue.')
    .addStringOption(option =>
      option
        .setName('mode')
        .setDescription('Loop mode: song, queue, or disable')
        .setRequired(true)
        .addChoice('song', 'song')
        .addChoice('queue', 'queue')
        .addChoice('disable', 'disable'),
    ),
  async execute(interaction, client) {
    const mode = interaction.options.getString('mode');
    const player = client.manager.players.get(interaction.guildId);

    if (!player || !player.playing) {
      return interaction.reply({ content: 'There is no song currently playing.', ephemeral: true });
    }

    switch (mode) {
      case 'song':
        player.setTrackRepeat(true);
        player.setQueueRepeat(false);
        interaction.reply('Looping the current song.');
        break;
      case 'queue':
        player.setTrackRepeat(false);
        player.setQueueRepeat(true);
        interaction.reply('Looping the queue.');
        break;
      case 'disable':
        player.setTrackRepeat(false);
        player.setQueueRepeat(false);
        interaction.reply('Looping disabled.');
        break;
    }
  },
};

