module.exports.run = (client, message, args) => {
  if (message.channel.type === 'dm') return;
  message.channel.send('text here')
}
