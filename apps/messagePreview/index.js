const _ = require("lodash");

exports.call = async (client) => {
  client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;

    if (_.startsWith(msg.content, "https://discord.com/channels/")) {
      const ids = _.split(msg.content, "/");
      if (_.size(ids) == 7) {
        try {
          const channel = await msg.guild.channels.fetch(_.get(ids, 5));
          const message = await channel.messages.fetch(_.get(ids, 6));
          const member = message.member;
          console.log(message.embeds);
          await msg.channel.send({
            content: `${message.channel}`,
            embeds: [
              {
                author: {
                  name: member ? member.displayName : "???",
                  icon_url: member ? member.displayAvatarURL() : "",
                  url: message.url,
                },
                description: message.content,
                color: message.author.hexAccentColor,
                timestamp: message.createdAt,
              },
            ],
          });
          await msg.channel.send({
            embeds: message.embeds,
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
  });
};
