module.exports.run = (client, message, args) => {
  if (message.channel.type === 'dm') return;
  if (message.member.hasPermission("MANAGE_MESSAGES")) {;
      const amount = parseInt(args[0]);
      if(isNaN(amount)) {
          return message.reply(`Duh, try again but say a number of messages to delete`)
}     else if (amount < 1 || amount > 100) {
          return message.reply(`you can only delete between 1 and 100 messages`);
}
      message.channel.bulkDelete(amount);
}
    else {
  message.reply("You do not have permission to delete messages");
}
}
