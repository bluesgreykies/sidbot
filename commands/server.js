const Discord = require("discord.js");
module.exports.run = (client, message, args) => {
  if (message.channel.type === 'dm') return;
  const serverinfo = new Discord.MessageEmbed()
    .setColor('#32a85a')
    .setTitle(`Info about ${message.guild.name}.`)
    .setThumbnail(message.guild.iconURL())
    .addFields(
        { name: 'Owner', value: `${message.guild.owner.user.tag}`, inline: false },
        { name: 'Members', value: `${message.guild.memberCount}`, inline: true },
        { name: 'Members online', value: `${message.guild.members.cache.filter(m => m.user.presence.status == "online").size}`, inline: true },
        { name: 'Bots', value: `${message.guild.members.cache.filter(m => m.user.bot).size}`, inline: true },
        { name: 'Server created at', value: `${message.guild.createdAt}`},
        { name: 'Roles', value: `${message.guild.roles.cache.size} roles`, inline: true },
        { name: 'Emojis', value: `${message.guild.emojis.cache.size}`, inline: true}
    )
    .setTimestamp()
    .setFooter(`Requested by ${message.author.username}`)
         message.channel.send(serverinfo)
     }
