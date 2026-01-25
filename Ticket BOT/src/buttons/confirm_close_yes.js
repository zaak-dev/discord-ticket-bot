const { EmbedBuilder } = require('discord.js');

module.exports = {
  customId: 'confirm_close_yes',
  
  async execute(interaction) {
    // Mensagem de contagem
    const countdownEmbed = new EmbedBuilder()
      .setColor('#FF0000')
      .setDescription('🔒 Closing ticket in **5 seconds**...');
    
    await interaction.update({ 
      content: '', 
      embeds: [countdownEmbed], 
      components: [] 
    });
    
    // Contagem regressiva
    setTimeout(async () => {
      try {
        await interaction.channel.delete();
      } catch (error) {
        console.error('Erro ao deletar canal:', error);
      }
    }, 5000);
  }
};