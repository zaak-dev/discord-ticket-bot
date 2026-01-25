const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup-ticket')
    .setDescription('🎫 Configura o sistema de tickets')
    .setDefaultMemberPermissions('0'), // Permissão de Administrador
    
  async execute(interaction) {
    console.log('🎯 Comando /setup-ticket executado por:', interaction.user.tag);
    
    // Verifica se é admin
    if (!interaction.member.permissions.has('Administrator')) {
      return interaction.reply({ 
        content: '❌ Apenas administradores podem usar este comando!', 
        ephemeral: true 
      });
    }
    
    try {
      // RESPONDE IMEDIATAMENTE (IMPORTANTE!)
      await interaction.reply({ 
        content: '🔄 Criando sistema de tickets...', 
        ephemeral: true 
      });
      
      // Embed principal
      const embed = new EmbedBuilder()
        .setColor('#00FF00')
        .setTitle('🎫 F2P Support Ticket')
        .setDescription('Create a ticket to contact the support team if you have any questions or problems')
        .setImage('https://media.discordapp.net/attachments/1311348501053050911/1464775943720669204/Banner_Hytale.jpg?ex=6976b267&is=697560e7&hm=7d87a2cb1813e94d6975b24e1608e265f98812730b70557e0e4eb5cb74c279f6&=&format=webp') // SUA IMAGEM AQUI
        .setFooter({ text: 'F2P Support System' })
        .setTimestamp();
      
      // Botão de criar ticket
      const button = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId('create_ticket')
            .setLabel('Create Ticket')
            .setStyle(ButtonStyle.Success)
            .setEmoji('🎫')
        );
      
      // Envia a mensagem no canal
      await interaction.channel.send({ 
        embeds: [embed], 
        components: [button] 
      });
      
      // Edita a resposta
      await interaction.editReply({ 
        content: '✅ Sistema de tickets configurado com sucesso!' 
      });
      
    } catch (error) {
      console.error('💥 ERRO no setup-ticket:', error);
      await interaction.editReply({ 
        content: '❌ Erro ao configurar sistema!' 
      });
    }
  }
};