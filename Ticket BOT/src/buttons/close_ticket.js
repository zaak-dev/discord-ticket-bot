const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  customId: 'close_ticket',
  
  async execute(interaction) {
    // Verificar permissões
    const supportRole = interaction.guild.roles.cache.get(process.env.SUPPORT_ROLE_ID);
    const isSupport = interaction.member.roles.cache.has(supportRole.id) || 
                      interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels);
    
    if (!isSupport && interaction.user.id !== interaction.channel.topic) {
      return interaction.reply({ 
        content: '❌ Apenas staff ou o criador do ticket pode fechar!', 
        ephemeral: true 
      });
    }
    
    // Embed de confirmação
    const confirmEmbed = new EmbedBuilder()
      .setColor('#FFA500')
      .setTitle('⚠️ Confirm Close')
      .setDescription('Are you sure you want to close the ticket?')
      .setFooter({ text: 'This action cannot be undone' });
    
    const confirmButtons = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('confirm_close_yes')
          .setLabel('Yes')
          .setStyle(ButtonStyle.Danger)
          .setEmoji('✅'),
        new ButtonBuilder()
          .setCustomId('confirm_close_no')
          .setLabel('No')
          .setStyle(ButtonStyle.Secondary)
          .setEmoji('❌')
      );
    
    await interaction.reply({ 
      embeds: [confirmEmbed], 
      components: [confirmButtons],
      ephemeral: true 
    });
  }
};