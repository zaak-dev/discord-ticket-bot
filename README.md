Discord Ticket Bot
Author
Zak Dev - Brazilian Full Stack Developer
https://github.com/zaak-dev
Professional ticket system bot for Discord with modern button interface.

Quick Setup

1. Install Dependencies

npm install

2. Configure Environment
Fill in your Discord credentials:
env
DISCORD_TOKEN=your_bot_token_here
CLIENT_ID=your_bot_client_id_here
GUILD_ID=your_server_id_here
TICKET_CATEGORY_ID=ticket_category_id_here
SUPPORT_ROLE_ID=support_role_id_here

3. Start the Bot
npm start

How to Use

1. Invite the bot to your server with Administrator permissions

2. Run the command in any channel:
/setup-ticket
(Only server administrators can use this command)
The bot will create a ticket panel with "Create Ticket" button

Users click the button to open private support tickets

Staff can close tickets with confirmation system
