const { REST, Routes } = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`✅ ${client.user.tag} está online!`);
    client.user.setActivity('F2P Support Tickets', { type: 'WATCHING' });
    
    // Registrar comando específico
    const commands = [];
    const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      commands.push(command.data.toJSON());
    }
    
    try {
      console.log('🔄 Registrando slash command...');
      const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
      
      await rest.put(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
        { body: commands }
      );
      
      console.log(`✅ Comando /setup-ticket registrado para o servidor!`);
    } catch (error) {
      console.error('❌ Erro ao registrar command:', error);
    }
  }
};