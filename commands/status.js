const Discord = require("discord.js");
const humanizeDuration = require('humanize-duration');
exports.run = (client, message, args, guild) => {
  if (message.channel.type === 'dm') return;
  let users = client.guilds.cache.reduce((x,y) => x + y.memberCount, 0)
  let uptime = humanizeDuration(client.uptime, { round: true });
  const statusembed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`Sidbot Status`)
    .addFields(
        { name: 'Uptime', value: `${uptime}`},
        { name: 'Servers', value: `${client.guilds.cache.size}`},
        { name: 'Users', value: `${users}`},
        { name: 'Channels', value: `${client.channels.cache.size}`}
      )
  message.channel.send(statusembed);
}
