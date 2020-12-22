const Discord = require("discord.js");
module.exports.run = (client, message, args) => {
  if (message.channel.type === 'dm') return;
  
if(message.mentions.users.size){
         let member=message.mentions.users.first()
     if(member){
         const emb=new Discord.MessageEmbed().setImage(member.displayAvatarURL({ dynamic: true })).setTitle(`${member.username}'s avatar`)
         message.channel.send(emb)
     }
     else{
         message.channel.send("Duh, can't find anyone here called that :telescope:")
    }
     }else{
         const emb=new Discord.MessageEmbed().setImage(message.author.displayAvatarURL({ dynamic: true })).setTitle(`${message.author.username}'s avatar`)
         message.channel.send(emb)
     }
}
