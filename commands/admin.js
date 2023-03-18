module.exports = {
    name: 'admin',
    description: 'Admin commands for managing the bot.',
    options: [
      {
        name: 'prefix',
        description: 'Change the bot command prefix',
        type: 'SUB_COMMAND',
        options: [
          {
            name: 'value',
            description: 'New prefix value',
            type: 'STRING',
            required: true,
          },
        ],
      },
      // Add more subcommands as needed
    ],
    async execute(interaction, client) {
      const subcommand = interaction.options.getSubcommand();
  
      if (subcommand === 'prefix') {
        await handlePrefix(interaction, client);
      }
      // Handle other subcommands as needed
    },
  };
  
  async function handlePrefix(interaction, client) {
    // Check if the user has permission to manage the bot
    if (!interaction.member.permissions.has('MANAGE_GUILD')) {
      return await interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }
  
    const newPrefix = interaction.options.getString('value');
    if (!newPrefix || newPrefix.length > 5) {
      return await interaction.reply({ content: 'Invalid prefix. Please provide a prefix with a maximum length of 5 characters.', ephemeral: true });
    }
  
    // Save the new prefix to the database
    // ...
  
    await interaction.reply(`The new prefix for this server is: \`${newPrefix}\``);
  }
  