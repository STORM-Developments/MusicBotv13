const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'info',
  description: 'Displays bot information.',
  async execute(interaction, client) {
    const embed = new MessageEmbed()
      .setTitle('Bot Information')
      .setDescription('This is a music bot using Spotify API, Lavalink, and MongoDB.')
      .setColor('#1DB954');
    await interaction.reply({ embeds: [embed] });
  },
};
