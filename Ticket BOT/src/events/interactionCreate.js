const { Events } = require('discord.js');

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction, client) {
    console.log(`🔔 Interação recebida: ${interaction.type}`);
    
    // Se for SLASH COMMAND
    if (interaction.isChatInputCommand()) {
      console.log(`📝 Comando: /${interaction.commandName}`);
      
      const command = client.commands.get(interaction.commandName);
      
      if (!command) {
        console.log(`❌ Comando não encontrado: ${interaction.commandName}`);
        return interaction.reply({ 
          content: 'Comando não encontrado!', 
          ephemeral: true 
        });
      }
      
      try {
        console.log(`▶️ Executando comando: ${command.data.name}`);
        await command.execute(interaction, client);
        console.log(`✅ Comando executado: ${command.data.name}`);
      } catch (error) {
        console.error(`💥 ERRO no comando ${interaction.commandName}:`, error);
        await interaction.reply({ 
          content: '❌ Erro ao executar comando!', 
          ephemeral: true 
        });
      }
    }
    
    // Se for BOTÃO - AGORA USANDO A COLEÇÃO client.buttons
    if (interaction.isButton()) {
      console.log(`🔘 Botão clicado: ${interaction.customId}`);
      
      const button = client.buttons.get(interaction.customId);
      
      if (!button) {
        console.log(`❌ Botão não encontrado: ${interaction.customId}`);
        return interaction.reply({ 
          content: 'Botão não configurado!', 
          ephemeral: true 
        });
      }
      
      try {
        await button.execute(interaction, client);
        console.log(`✅ Botão processado: ${interaction.customId}`);
      } catch (error) {
        console.error(`💥 ERRO no botão ${interaction.customId}:`, error);
        await interaction.reply({ 
          content: '❌ Erro ao processar botão!', 
          ephemeral: true 
        });
      }
    }
  }
};