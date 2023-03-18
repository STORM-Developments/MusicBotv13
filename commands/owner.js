const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('owner')
    .setDescription("Displays the bot owner's information."),
  async execute(interaction, client) {
    const owner = await client.users.fetch(config.ownerId);

    const embed = new MessageEmbed()
      .setTitle("Bot Owner's Information")
      .setDescription(`Username: ${owner.tag}\nID: ${owner.id}`)
      .setColor('#1DB954');

    await interaction.reply({ embeds: [embed] });
  },
};
