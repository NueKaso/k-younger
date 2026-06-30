import 'dotenv/config';
import http from 'http';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers  
  ],
});

client.once('ready', () => {
  console.log("Ready!");
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.guild) return;

  const targetId = "916218010824499211";

  // Оптимизация: код срабатывает ТОЛЬКО если сообщение написал сам целевой юзер
  if (message.author.id !== targetId) return;

  try {
    const serv = client.guilds.cache.get(message.guild.id);
    if (!serv) return;
    
    // Берем юзера из кэша сообщения, чтобы не делать fetch запрос в сеть
    const vlad = message.member;
    if (!vlad) return;

    const currentName = vlad.nickname || vlad.user.username;

    if (!currentName.endsWith("/коч")) {
      const botMember = serv.members.me || await serv.members.fetch(client.user.id);
      
      if (!botMember.permissions.has('ManageNicknames')) {
        console.error("no permissions");
        return;
      }

      if (botMember.roles.highest.position <= vlad.roles.highest.position) {
        console.error("Role lower than target");
        return;
      }

      const newName = currentName + '/коч';
      
      if (newName.length > 32) {
        console.error("New nickname is too long");
        return;
      }

      await vlad.setNickname(newName);
      console.log(`Nickname changed for ${vlad.user.username}`);
    }
  } catch (error) {
    console.error("Changename/error", error);
  }
});

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running\n');
}).listen(process.env.PORT || 3000, () => {
  console.log('Web server is running');
});

client.login(process.env.DISCORD_TOKEN);
