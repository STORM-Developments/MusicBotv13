const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays a song from Spotify.')
    .addStringOption(option =>
      option
        .setName('query')
        .setDescription('The Spotify URL or search query for the song to play')
        .setRequired(true),
    ),
  async execute(interaction, client) {
    const query = interaction.options.getString('query');
    const member = interaction.member;
    const voiceChannel = member.voice.channel;

    if (!voiceChannel) {
      return interaction.reply({ content: 'You must be in a voice channel to use this command.', ephemeral: true });
    }

    const player = client.manager.create({
      guild: interaction.guildId,
      voiceChannel: voiceChannel.id,
      textChannel: interaction.channelId,
    });

    if (player.state !== 'CONNECTED') player.connect();

    const searchResult = await player.search(query, interaction.user);

    if (searchResult.loadType === 'NO_MATCHES') {
      return interaction.reply({ content: 'No results were found for your query.', ephemeral: true });
    }

    if (searchResult.loadType === 'PLAYLIST_LOADED') {
      searchResult.tracks.forEach(track => player.queue.add(track));
      interaction.reply(`Added ${searchResult.tracks.length} tracks from the playlist to the queue.`);
    } else {
      const track = searchResult.tracks[0];
      player.queue.add(track);
      interaction.reply(`Added track: ${track.title} to the queue.`);
    }

    if (!player.playing && !player.paused && !player.queue.size) player.play();
  },
};
