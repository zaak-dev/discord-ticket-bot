const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField, ChannelType } = require('discord.js');

module.exports = {
  customId: 'create_ticket',
  
  async execute(interaction) {
    // Verificar se já tem ticket aberto
    const existingChannel = interaction.guild.channels.cache.find(ch => 
      ch.name === `ticket-${interaction.user.username.toLowerCase()}`
    );
    
    if (existingChannel) {
      return interaction.reply({ 
        content: `❌ Você já tem um ticket aberto: ${existingChannel}`, 
        ephemeral: true 
      });
    }
    
    // Criar canal
    const channel = await interaction.guild.channels.create({
      name: `ticket-${interaction.user.username}`,
      type: ChannelType.GuildText,
      parent: process.env.TICKET_CATEGORY_ID,
      permissionOverwrites: [
        {
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel]
        },
        {
          id: interaction.user.id,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ReadMessageHistory
          ]
        },
        {
          id: process.env.SUPPORT_ROLE_ID,
          allow: [
            PermissionsBitField.Flags.ViewChannel,
            PermissionsBitField.Flags.SendMessages,
            PermissionsBitField.Flags.ReadMessageHistory,
            PermissionsBitField.Flags.ManageMessages
          ]
        }
      ]
    });
    
    // Embed do ticket
    const embed = new EmbedBuilder()
      .setColor('#00FF00')
      .setTitle('🎫 Ticket de Suporte')
      .setDescription(`Hello <@${interaction.user.id}>, you will be assisted by one of our support teams shortly.\n\nIf you wish to close the ticket, click to close.`)
      .addFields(
        { name: '👤 Usuário', value: `<@${interaction.user.id}>`, inline: true },
        { name: '📅 Criado em', value: `<t:${Math.floor(Date.now() / 1000)}:f>`, inline: true }
      )
      .setFooter({ text: 'F2P Support System' });
    
    // Botão de fechar
    const closeButton = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('close_ticket')
          .setLabel('Close Ticket')
          .setStyle(ButtonStyle.Danger)
          .setEmoji('🔒')
      );
    
    await channel.send({ 
      content: `<@${interaction.user.id}> <@&${process.env.SUPPORT_ROLE_ID}>`, 
      embeds: [embed], 
      components: [closeButton] 
    });
    
    await interaction.reply({ 
      content: `✅ Ticket criado: ${channel}`, 
      ephemeral: true 
    });
  }
};