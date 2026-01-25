// src/index.js
require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Criar o cliente do Discord
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

// Coleções para comandos e botões
client.commands = new Collection();
client.buttons = new Collection();

// Carregar comandos MANUALMENTE
console.log('📂 Carregando comandos...');
try {
    const ticketCommand = require('./commands/ticket.js');
    client.commands.set(ticketCommand.data.name, ticketCommand);
    console.log(`✅ Comando carregado: ${ticketCommand.data.name}`);
} catch (error) {
    console.error('❌ Erro ao carregar comando:', error);
}

// Carregar botões COM NOMES CORRETOS (AGORA COM UNDERSCORE)
console.log('📂 Carregando botões...');
try {
    // Botão criar ticket
    const createTicketButton = require('./buttons/create_ticket.js');
    client.buttons.set(createTicketButton.customId, createTicketButton);
    console.log(`✅ Botão carregado: ${createTicketButton.customId}`);
    
    // Botão fechar ticket
    const closeTicketButton = require('./buttons/close_ticket.js');
    client.buttons.set(closeTicketButton.customId, closeTicketButton);
    console.log(`✅ Botão carregado: ${closeTicketButton.customId}`);
    
    // Botão confirmar fechamento SIM
    const confirmCloseYesButton = require('./buttons/confirm_close_yes.js');
    client.buttons.set(confirmCloseYesButton.customId, confirmCloseYesButton);
    console.log(`✅ Botão carregado: ${confirmCloseYesButton.customId}`);
    
    // Botão cancelar fechamento NÃO
    const cancelCloseButton = require('./buttons/confirm_close_no.js');
    client.buttons.set(cancelCloseButton.customId, cancelCloseButton);
    console.log(`✅ Botão carregado: ${cancelCloseButton.customId}`);
    
} catch (error) {
    console.error('❌ Erro ao carregar botões:', error);
}

// Carregar eventos
console.log('📂 Carregando eventos...');
try {
    const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
    
    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
            console.log(`✅ Evento carregado (once): ${event.name}`);
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
            console.log(`✅ Evento carregado: ${event.name}`);
        }
    }
} catch (error) {
    console.error('❌ Erro ao carregar eventos:', error);
}

// Log de erros
client.on('error', (error) => {
    console.error('💥 ERRO DO CLIENTE:', error);
});

client.on('warn', (warning) => {
    console.warn('⚠️ AVISO DO CLIENTE:', warning);
});

client.on('debug', (info) => {
    console.debug('🐛 DEBUG:', info);
});

// Login do bot
console.log('🔑 Conectando ao Discord...');
client.login(process.env.DISCORD_TOKEN)
    .then(() => {
        console.log('🚀 Login realizado com sucesso!');
    })
    .catch((error) => {
        console.error('❌ ERRO NO LOGIN:', error);
    });