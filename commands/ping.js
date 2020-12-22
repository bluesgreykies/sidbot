module.exports.run = async function(client, message, args, config, gdb, prefix, permissionLevel, db) {
  if (message.channel.type === 'dm') return;
  let botMsg = await message.channel.send("⌛ Pinging")

  botMsg.edit({ embed: {
    title: "📶 Ping",
    description: [
      "**Server**: `" + (botMsg.createdAt - message.createdAt) + "ms`",
    ].join("\n"),
    footer: { text: "Requested by " + message.author.tag, icon_url: message.author.displayAvatarURL },
    timestamp: new Date()
  }}).catch(() => botMsg.edit("🆘 An unknown error occurred. Do I have permission? (Embed Links)"));
}
