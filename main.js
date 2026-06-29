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



client.once('clientReady', () => {
  console.log("Ready!");
  
  
  setInterval(async() => {

    const serv =  client.guilds.cache.get("1458159627744317561") // cur my id тще ьн

    if (!serv) return;
    
    try {
      const vlad =  await serv.members.fetch("916218010824499211") // cur my id тще ьн
      const currentName = vlad.nickname || vlad.user.username;

      if (!currentName.endsWith("/коч")) {
        await vlad.setNickname(currentName + '/коч');
      }
    } catch (error){
      console.error(error)
    }
  }, 5000)
});
  





http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is running\n');
}).listen(process.env.PORT || 3000, () => {
  console.log('Web server is running');
});

client.login(process.env.DISCORD_TOKEN);