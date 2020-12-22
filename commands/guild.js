const config = require("../config.json");
module.exports.run = (client, message, args) => {
  const guildNames = client.guilds.cache.map(g => g.name).join("\n")
    if (message.channel.type === 'dm') return;
if(message.author.id !== config.ownerID) return;
    message.channel.send(guildNames)
      .catch(console.error)
}
