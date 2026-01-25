module.exports = {
  customId: 'confirm_close_no',
  
  async execute(interaction) {
    await interaction.update({ 
      content: '❌ Ticket closure cancelled.', 
      embeds: [], 
      components: [] 
    });
  }
};