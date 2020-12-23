const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const humanizeDuration = require('humanize-duration');
const client = new Discord.Client();
const config = require("./config.json");
client.config = config;

client.on("ready", () => {
    client.user.setPresence({ activity: { name: `${config.prefix}help in ${client.guilds.cache.size} servers` }, status: 'Online' });
    console.log(`Online - Logged in as ${client.user.tag}`)
  });

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Enmap();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`loading command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

//function to convert a mention into an ID (don't change anything here)
function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

//Help command
client.on('message', message => {
  if (!message.content.startsWith(config.prefix) || message.author.bot) return;
  if (message.channel.type === 'dm') return;
  const args = message.content.slice(config.prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command == 'help') {
    if (!args.length) {
    const help = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`Sidbot Help`)
      .setDescription(`For help on each of the modules below type ${config.prefix}help <module>`)
      .addFields(
        { name: '\u200b', value: 'Moderator\nUtility\nBot'},
        { name: 'Links', value: '[Website](http://www.sidilleth.96.lt)\n[Support server](https://dsc.gg/sidbotsupport)\n[Add sidbot to your server](https://discord.com/oauth2/authorize?client_id=729654465698857061&permissions=269872246&scope=bot)'}
      )
      .setThumbnail('https://i.imgur.com/vHyuhas.jpg')
      .setFooter('Powered by Sidbot!')

      message.channel.send(help);
  } else if (args[0] === 'moderator') {
    const modhelp = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`Moderator Commands help`)
      .addFields(
        { name: 'Kick', value: `Kicks a mentioned user\n**Usage:** *${config.prefix}kick @user <reason>*`},
        { name: 'Ban', value: `Bans a mentioned user\n**Usage:** *${config.prefix}ban @user <reason>*`},
        { name: 'Warn', value: `Warns a mentioned user\n**Usage:** *${config.prefix}warn @user <reason>*`},
        { name: 'Del', value: `Deletes specified number of messages (up to 100)\n**Usage:** *${config.prefix}del <amount>*`},
      )
      message.channel.send(modhelp);

  } else if (args[0] === 'utility') {
    const utilityhelp = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`Utility Commands help`)
      .addFields(
        { name: 'Avatar', value: `Displays mentioned user\'s avatar\n**Usage:** *${config.prefix}avatar @user*`},
        { name: 'Server', value: `Displays info about current server\n**Usage:** *${config.prefix}server*`},
        { name: 'User', value: `Displays info about mentioned user\n**Usage:** *${config.prefix}user @user*`},
      )
      message.channel.send(utilityhelp);

  } else if (args[0] === 'bot') {
    const bothelp = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle(`Bot Commands help`)
      .addFields(
        { name: 'Status', value: `Shows info about the bot\n**Usage:** *${config.prefix}status`},
        { name: 'Ping', value: `Gets ping of the bot\n**Usage:** ${config.prefix}ping`},
      )
      message.channel.send(bothelp);
  }//end elseif
}//end of args variable
});//end help command




//moderator commands
client.on('message', async message => {
    if (message.channel.type === 'dm') return;
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;
    const args = message.content.slice(config.prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();

    if (command == 'ban') {
      const mod = message.author.username;

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('You do not have permission to ban members')
        if (args.length < 2) {
		        return message.reply(`Please mention the user you want to ban and specify a ban reason.\n**Usage:** *${config.prefix}ban @user <reason>*`);
	         }

	          const member = message.mentions.members.first();
	           if (!member) {
		             return message.reply('Please use a proper mention if you want to ban someone.');
	              }
                if (member.hasPermission("BAN_MEMBERS")) return message.channel.send(`${mod} you cannot ban a user with the same or higher permissions`)
	               const reason = args.slice(1).join(' ');
                 const success = new Discord.MessageEmbed()
                   .setColor('#eb4034')
                   .setDescription(`${member} was banned by ${message.author.username}\n**Reason:** ${reason}`)
                   .setTimestamp()
                 const banned = new Discord.MessageEmbed()
                   .setColor('#eb4034')
                   .setDescription(`You were banned from the ${message.guild} for reason: ${reason}`)
                   .setTimestamp()
	                try {
                      await message.delete();
                      await member.send(banned);
		                  await message.guild.members.ban(member, { reason });
	                   } catch (error) {
		                     return message.channel.send(`Failed to ban **${member.tag}**: ${error}`);
	                      }

	                       return message.channel.send(success);

      } else if (command == 'warn') {
          const mod = message.author.username;

              if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('You do not have permission to warn members')
              if (args.length < 2) {
                   return message.reply(`Please mention the user you want to warn and specify a warn reason.\n**Usage:** *${config.prefix}warn @user <reason>*`);
              }

                   const user = getUserFromMention(args[0]);
                   	  if (!user) {
                   		   return message.reply('Please use a proper mention if you want to warn someone.');
                   	  }

                   const reason = args.slice(1).join(' ');
                   const success = new Discord.MessageEmbed()
                    .setColor('#eb4034')
                    .setDescription(`${message.mentions.members.first()} was warned by ${message.author.username}\n**Reason:** ${reason}`)
                    .setTimestamp()
                  const warned = new Discord.MessageEmbed()
                    .setColor('#eb4034')
                    .setDescription(`You were warned in the ${message.guild}\n**Reason:** ${reason}`)
                    .setTimestamp()
                   	    try {
                            await message.delete();
                   		      await user.send(warned);
                   	    } catch (error) {
                   		        return message.channel.send(`Failed to DM warning to **${user.tag}**: ${error}`);
                   	    }

                   	         return message.channel.send(success);
        } else if (command == 'kick') {
          const mod = message.author.username;
            if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('You do not have permission to kick members')
            if (args.length < 2) {
                return message.reply(`Please mention the user you want to kick and specify a reason.\n**Usage:** ${config.prefix}kick @user <reason>`);
              }

                const member = message.mentions.members.first();
                    if (!member) {
                      return message.reply('Please use a proper mention if you want to kick someone.');
                    }
                    if (member.hasPermission("KICK_MEMBERS")) return message.channel.send(`${mod} you cannot kick a user with the same or higher permissions`)
                    const reason = args.slice(1).join(' ');
                    const success = new Discord.MessageEmbed()
                      .setColor('#eb4034')
                      .setDescription(`${message.mentions.members.first()} was kicked by ${message.author.username}\n**Reason:** ${reason}`)
                      .setTimestamp()
                    const kicked = new Discord.MessageEmbed()
                      .setColor('#eb4034')
                      .setDescription(`You were kicked from the ${message.guild}\n**Reason:** ${reason}`)
                      .setTimestamp()
                    try {
                        await message.delete();
                        await member.send(kicked);
                        member.kick(reason)
                    } catch (error) {
                          return message.channel.send(`There was an error trying to kick **${member.tag}**: ${error}`);
                    }
                         return message.channel.send(success);

        }
});

client.login(config.token);
